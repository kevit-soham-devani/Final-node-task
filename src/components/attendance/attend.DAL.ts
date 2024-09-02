/**attendance.Dal.ts */
import Attendance from './attend.model';
import moment from 'moment'

/**
 * Creates attendance in DB
 * @export
 * @param  attendanceData
 * @return {*}
 */
export async function addAttendance(reqBody) {
	try {
		return await Attendance.create(reqBody);
	} catch (e) {
		return e;
	}
}

/**
 *
 * Updates student attendance in DB
 * @export
 * @param {string} rollNumber
 * @param {string} date
 * @param {string} isAbsent
 * @return {*}
 */
export async function updateAttendanceRecord(rollNumber: string, date: string, isAbsent: string) {
    try {
        const formattedDate = moment(date, 'DD-MM-YYYY').toDate();
        return await Attendance.findOneAndUpdate(
            { rollNumber, date: formattedDate },
            { isAbsent },
            { new: true,runValidators:true }
        );
    } catch (e) {
        throw new Error(`Error while updating attendance: ${e.message}`);
    }
}