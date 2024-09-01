import { Router } from "express";
import BatchController from "./batch.controller";
import auth from "../../utils/auth";

class BatchRoute {
	public router: Router;
	batchController = new BatchController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//Route to get Batches
		this.router.get('/batch', auth, this.batchController.getBatches);
		// Route to create a new batch
		this.router.post('/batch', auth, this.batchController.createBatch);
		// Route to add a branch to a batch for a specific year
		this.router.post('/batch/branch', auth, this.batchController.addBranch);
		//Route to delete a Batch
		this.router.delete(
			'/batch/:year',
			auth,
			this.batchController.deleteBatch,
		);
		//Route to update a Batch
		this.router.patch('/batch', auth, this.batchController.updateBatch);
		//Route to get Batch analytics
		this.router.get(
			'/batch/analytics',
			auth,
			this.batchController.getVacantSeats,
		);
	}
}

export default new BatchRoute().router;