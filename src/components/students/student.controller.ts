/**student.controller.ts */
import { checkSeat,
	getStudentAnalyticsData,
	incrementSeatCount,
	decrementSeatCount } from './student.helper';
import {
	createNewStudent,
	deleteStudent,
	getStudentBydetail,
	updateStudent,
} from './student.DAL';



class StudentController {

/**
 * Function to create a new Student
 * @param {Request} req=>Express Request
 * @param {Response} res=> Express Response
 * @return {*}
 * @memberof StudentController
 */
	async createStudent(req, res, next) {
		try {
			const { department, batch } = req.body;
			const isSeatAvailable = await checkSeat(department, batch);
			if (!isSeatAvailable) {
				return res.send({
					message: 
						'No seats available in the selected branch for this batch year',
				});
			}
			const student = await createNewStudent(req.body);
			await incrementSeatCount({department, batch})
			res.status(201).send(student);
		} catch (e) {
			res.send({ message: e.message });
		}
	}
		/**
	 * Function to Get students
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof StudentController
	 */
	async getStudents(req, res, next) {
		try {
			const students = await getStudentBydetail({});
			if (!students) {
				return res.send({ message: 'No students exists' });
			}
			res.status(200).send(students);
		} catch (e) {
			res.send(e);
		}
	}
	/**
	 * Function to delete a student
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof StudentController
	 */
	async deleteStudent(req, res, next) {
		try {
			const { rollNumber } = req.params;
			const student = await deleteStudent(rollNumber);
			if (!student) {
				return res
					.status(404)
					.send({ message: 'Student does not exist' });
			}
			await decrementSeatCount(student);
			return res.status(200).send(student);
		} catch (e) {
			return res.status(500).send(e);
		}
	}
	/**
	 * Function to get student analytics
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof StudentController
	 */

	async getStudentAnalytics(req, res, next) {
		try {
			const analytics = await getStudentAnalyticsData();
			res.status(200).send(analytics);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	}
	/**
	 * Function to update student data
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof StudentController
	 */
	async updateStudent(req, res, next) {
		try {
			const { rollNumber } = req.params;
			const updateData = req.body;

			const updatedStudent = await updateStudent(rollNumber, updateData);
			if (!updatedStudent) {
				return res.status(404).send({ message: 'Student not found' });
			}

			res.status(200).send(updatedStudent);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	}
}
export default StudentController;
