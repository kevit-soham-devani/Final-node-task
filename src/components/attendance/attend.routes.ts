/**attendance.routes.ts */
import { Router } from 'express';
import AttendanceController from './attend.controller';
import auth from '../../utils/auth'
class AttendanceRoute {
	public router: Router;

	attendanceController = new AttendanceController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//route to add attendance
		this.router.post(
			'/attendance',
			auth,
			this.attendanceController.createAttendance,
		);
		//route to get absentees
		this.router.get(
			'/absentees',
			auth,
			this.attendanceController.getAttendance,
		);
		//route to update attendance
		this.router.patch(
			'/attendance/:rollNumber',
			auth,
			this.attendanceController.updateAttendance,
		);
		//route to get attendance analytics(<75%)
		this.router.get(
			'/attendance/analytics',
			auth,
			this.attendanceController.getAttendanceAnalytics,
		);
	}
}

export default new AttendanceRoute().router;
