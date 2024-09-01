/**student.Dal.ts */
import Student from './student.model';

/**
 * Creates a new Student in DB
 * @export
 * @param studentData
 * @return {*}
 */
export async function createNewStudent(reqBody) {
	try {
		return await Student.create(reqBody);
	} catch (e) {
		return e;
	}
}
/**
 * Fetches student details
 * @export
 * @param  obj
 * @return {*}
 */
export async function getStudentBydetail(obj: any) {
	try {
		return await Student.find({ ...obj });
	} catch (e) {
		return e;
	}
}
/**
 *Deletes a student from DB
 * @export
 * @param {string} studentRollNumber
 * @return {*}
 */

export async function deleteStudent(studentRollNumber) {
	try {
		const deletedStudent =await Student.findOneAndDelete({
			rollNumber:studentRollNumber});
		return deletedStudent;
	} catch (e) {
		return e;
	}
}
/**
 * Updates studentDetails
 * @export
 * @param  rollNumber
 * @param  updateData
 * @return {*}
 */
export async function updateStudent(rollNumber, updateData) {
	try {
		return await Student.findOneAndUpdate(
			{ rollNumber },
			{ $set: updateData },
			{ new: true, runValidators: true },
		);
	} catch (e) {
		return e;
	}
}
