/**student helper.ts */
import Batch from '../batch/batch.model';
import Student from './student.model';

/**
 * Helper to checkSeat availability when student is created
 * @export
 * @param {string} department
 * @param {number} batch
 * @return {*}  {Promise<boolean>}
 */
export async function checkSeat(
	department: string,
	batch: number,
): Promise<boolean> {
	try {
		const foundBatch = await Batch.findOne({ year: batch });
		if (!foundBatch) {
			throw new Error('Batch not found for the given year');
		}

		const branch = foundBatch.branches.find(
			(branch) => branch.name === department,
		);
		if (!branch) {
			throw new Error('Branch not found in the batch');
		}
		return branch.totalStudentsIntake > branch.currentSeatCount
	} catch (e) {
		throw e;
	}
}

/**
 *Helper to get student analytics
 * @export
 * @return {*}
 */
 export async function getStudentAnalyticsData() {
	try {
		const analytics = await Student.aggregate([
			{
				$group: {
					_id: {
						year: '$batch',
						branch: '$department',
					},
					totalStudents: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.year',
					totalStudents: { $sum: '$totalStudents' },
					branches: {
						$push: {
							k: '$_id.branch',
							v: '$totalStudents',
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					year: '$_id',
					totalStudents: 1,
					branches: { $arrayToObject: '$branches' },
				},
			},
		]);

		return analytics;
	} catch (e) {
		throw new Error(
			`Error while getting student analytics data: ${e.message}`,
		);
	}
}
/**
 * Helper to increment seat count when new student is added
 * @export
 * @param {*} { department, batch }
 * @return {*}
 */
export async function incrementSeatCount({ department, batch }) {
	try {
		return await Batch.findOneAndUpdate(
			{ year: batch, 'branches.name': department },
			{
				$inc: {
					'branches.$.currentSeatCount': 1,
					totalEnrolledStudents: 1,
				},
			},
			{ new: true },
		);
	} catch (e) {
		return e;
	}
}
/**
 * Helper to decrement seat count when student is deleted
 * @export
 * @param {*} student
 * @return {*}
 */
export async function decrementSeatCount(student) {
	try {
		return await Batch.findOneAndUpdate(
			{ year: student.batch, 'branches.name': student.department },
			{
				$inc: {
					'branches.$.currentSeatCount': -1,
					totalEnrolledStudents: -1,
				},
			},
			{ new: true },
		);
	} catch (e) {
		return e;
	}
}
