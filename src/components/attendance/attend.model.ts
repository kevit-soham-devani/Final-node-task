import mongoose from 'mongoose';
import moment from 'moment'
import { ISABSENT } from './attendence.enum';
const { Schema, model} = mongoose;

interface IAttendance extends Document {
    date: Date;
    isAbsent: ISABSENT;
    rollNumber: string;
}

const attendanceSchema = new Schema<IAttendance>({
    date: {
		type: Date,
		required: true,
		default: () => moment().toDate()
	},
	isAbsent: {       
		type: String,
		enum: ISABSENT,
		required: true,
	},
	rollNumber: {
		type: String,
		ref: 'User',
		required: true,
	},
});

const Attendance = model<IAttendance>('Attendance',attendanceSchema ) ;
export default Attendance