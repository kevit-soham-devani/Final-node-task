import Batch from "./batch.model";
import Student from "../students/student.model";
import Attendance from "components/attendance/attend.model";
import { checkAdmin, getVacantSeatsByYear} from "./batch.helper";
import { createNewBatch,
	deleteBatchByYear,
	updateBatch,
	addBranch } from "./batch.DAL";
import { User_Role } from "../../components/user/user.enum";
import { User } from "components/user/user.model";

class BatchController {
		/**
	 * Function to create a Batch
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
		async createBatch(req, res, next) {
			try {
				const { role } = req.user;
				if (checkAdmin(role)) {
					return res.status(401).send({ message: 'Not authorized' });
				}
				const { year, branches } = req.body;
				const existingBatch = await Batch.findOne({ year });
				if (existingBatch) {
					return res.status(400).send({
						message: 'Batch for this year already exists',
					});
				}
				const batch = await createNewBatch({ year, branches });
				return res.status(201).send(batch);
			} catch (e) {
				return res.status(500).send(e);
			}
		}
	/**
	 * Function to add a Brach in a batch
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
	async addBranch(req, res, next) {
		try {
			const { role } = req.user;
			if (checkAdmin(role)) {
				return res.status(401).send({ message: 'Not authorized' });
			}
			const { year } = req.query;
			const batch = await addBranch({ year, ...req.body });
			return res.status(200).send(batch);
		} catch (e) {
			return res.status(500).send(e);
		}
	}
		/**
	 *Function to delete a Batch
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
	 async deleteBatch(req, res, next) {
		try {
			const { role } = req.user;
			if (checkAdmin(role)) {
				return res.status(401).send({ message: 'Not authorized' });
			}
			const { year } = req.params;

			if (!year) {
				return res.status(404).send({
					message: 'Year is required',
				});
			}

			const deletedBatch = await deleteBatchByYear(year);
			if (!deletedBatch) {
				return res
					.status(404)
					.send({ message: 'Batch not found for the given year' });
			}
			await Student.deleteMany({ batch: deletedBatch.year });
			return res
				.status(200)
				.send({ message: 'Batch deleted successfully' });
		} catch (e) {
			return res.status(500).send(e);
		}
	}
	/**
	 *Function to Get all the batches
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
	async getBatches(req, res, next) {
		try {
			const { role } = req.user;
			if (checkAdmin(role)) {
				return res.status(401).send({ message: 'Not authorized' });
			}
			const batches = await Batch.find();
			return res.status(200).send(batches);
		} catch (e) {
			return res.status(500).send(e);
		}
	}
	/**
	 *Function to update Batch data
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
	async updateBatch(req, res, next) {
		try {
			const { role } = req.user;
			if (checkAdmin(role)) {
				return res.status(401).send({ message: 'Not authorized' });
			}
			const { year } = req.query;

			if (!year) {
				return res.status(400).send({
					message: 'Year is required',
				});
			}
			// console.log(req.body);
			// console.log({ year, ...req.body });
			
			const batch = await updateBatch({ year, ...req.body });
			return res.status(200).send(batch);
		} catch (e) {
			return res.status(500).send(e);
		}
	}
	/**
	 * Function to get Vacant seats for a particular year
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof BatchController
	 */
	async getVacantSeats(req, res, next) {
		try {
			const { role } = req.user;
			if (checkAdmin(role)) {
				return res.status(401).send({ message: 'Not authorized' });
			}
			const { year } = req.query;
			if (!year) {
				return res.status(400).send({ message: 'Year is required' });
			}
			const vacantSeats = await getVacantSeatsByYear(Number(year));
			return res.status(200).send(vacantSeats);
		} catch (e) {
			return res.status(500).send(e);
		}
	}
}

export default BatchController
