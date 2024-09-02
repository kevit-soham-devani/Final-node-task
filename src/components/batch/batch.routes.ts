import { Router } from "express";
import BatchController from "./batch.controller";
import auth from "../../utils/auth";
import { checkAdmin } from "./batch.helper";

class BatchRoute {
	public router: Router;
	batchController = new BatchController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//Route to get Batches
		this.router.get('/batch', auth,checkAdmin, this.batchController.getBatches);
		// Route to create a new batch
		this.router.post('/batch', auth,checkAdmin, this.batchController.createBatch);
		// Route to add a branch to a batch for a specific year
		this.router.post('/batch/branch', auth,checkAdmin, this.batchController.addBranch);
		//Route to delete a Batch
		this.router.delete(
			'/batch/:year',
			auth,
			checkAdmin,
			this.batchController.deleteBatch,
		);
		//Route to update a Batch
		this.router.patch('/batch', auth,checkAdmin, this.batchController.updateBatch);
		//Route to get Batch analytics
		this.router.get(
			'/batch/analytics',
			auth,
			checkAdmin,
			this.batchController.getVacantSeats,
		);
	}
}

export default new BatchRoute().router;