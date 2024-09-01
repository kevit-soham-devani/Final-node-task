/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
import UserRoute from './components/user/user.routes';
import StudentRoute from './components/students/student.routes';
import AttendanceRoute from './components/attendance/attend.routes';
import BatchController from './components/batch/batch.routes';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/', IndexRoute);
		app.use('/', UserRoute);
		app.use('/', StudentRoute);
		app.use('/', AttendanceRoute);
		app.use('/', BatchController);
	}
}
