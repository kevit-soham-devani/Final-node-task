/**batch.DAL.ts */
import Batch from './batch.model';

/**
 * Creates new Batch in DB
 * @export
 * @param batchData
 * @return {*}
 */
export async function createNewBatch(reqBody) {
	try {
		return await Batch.create(reqBody);
	} catch (e) {
		return e;
	}
}

/**
 * Deletes a Batch from DB
 * @export
 * @param {number} year
 * @return {*}
 */
export async function deleteBatchByYear(year: number) {
	try {
		return await Batch.findOneAndDelete({ year });
	} catch (e) {
		return e;
	}
}

/**
 * Updates Batch data in DB
 * @export
 * @param {*} {
 * 	year,
 * 	branchName,
 * 	newBranchName,
 * 	totalStudentsIntake,
 * 	currentSeatCount,
 * }
 * @return {*}
 */
export async function updateBatch({
	year,
	branchName,
	newBranchName,
	totalStudentsIntake,
	currentSeatCount,
}) {
	try {
		
		
		if (!branchName) {
			return { mesage: 'BranchName is required' };
		}
		const batch = await Batch.findOne({ year });
		if (!batch) {
			return { message: 'Batch not found for the given year' };
		}

		const branch = batch.branches.find(
			(branch) => branch.name === branchName,
		);
		if (!branch) {
			return { message: 'Branch not found in the batch' };
		}

		if (newBranchName) {
			branch.name = newBranchName;
		}
		if (totalStudentsIntake) {
			branch.totalStudentsIntake = totalStudentsIntake;
		}
		if (currentSeatCount) {
			branch.currentSeatCount = currentSeatCount;
		}
		await batch.save();
		return batch;
	} catch (e) {
		return e;
	}
}
/**
 * Adds a New Branch in DB
 * @export
 * @param {*} {
 * 	year,
 * 	name,
 * 	totalStudentsIntake,
 * 	currentSeatCount,
 * }
 * @return {*}
 */
export async function addBranch({
	year,
	name,
	totalStudentsIntake,
	currentSeatCount,
}) {
	try {
		if (!year) {
			return {
				message: 'Year is required',
			};
		}
		const batch = await Batch.findOne({ year });
		if (!batch) {
			return { message: 'Batch not found for the given year' };
		}
		const branchExists = batch.branches.some(
			(branch) => branch.name === name,
		);
		if (branchExists) {
			return { message: 'Branch already exists in the batch' };
		}
		batch.branches.push({
			name,
			totalStudentsIntake,
			currentSeatCount,
		});
		await batch.save();
		return batch;
	} catch (e) {}
}
