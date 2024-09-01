/**student.routes.ts */
import { Router } from 'express';
import StudentController from './student.controller';
import auth from '../../utils/auth';
import role from '../../utils/verifyrole'
class StudentRoute {
	public router: Router;

	studentController = new StudentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			'/student',
			auth,
			// role,
			this.studentController.createStudent,
		);
		this.router.get('/student', auth, this.studentController.getStudents);
		this.router.delete(
			'/student/:rollNumber',
			auth,
			this.studentController.deleteStudent,
		);
		this.router.get(
			'/analytics/students',
			auth,
			this.studentController.getStudentAnalytics,
		);
		this.router.patch(
			'/student/:rollNumber',
			auth,
			this.studentController.updateStudent,
		);
	}
}

export default new StudentRoute().router;
