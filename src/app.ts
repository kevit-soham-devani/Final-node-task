import express, {Application} from "express";
import * as mongoose from "mongoose";
import ApplicationConfig from "./app.routes";
import * as dotenv from "dotenv";
import Config from "./config";
dotenv.config();

dotenv.config();
const PORT = Config.server.port;

class App {
	app: express.Application;
	server: any
	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.initializeRoutes();
		this.connectToDatabase()
			.then(() => {
				// if()
			})
			.catch((err) => {
				console.error('Failed to connect to MongoDB', err);
			});
	}
	initializeRoutes() {
		ApplicationConfig.registerRoutes(this.app);
	}
	async connectToDatabase() {
		try {
			await mongoose.connect(Config.mongodb.url);
			console.log('Connected to MongoDB');
		} catch (err) {
			console.error('Error connecting to MongoDB', err);
			throw err;
		}
	}
	startServer() {
		this.server = this.app.listen(PORT, () => {
		console.log(`Listening to Port ${PORT}`);
		});
	}
	stopServer() {
		if(this.server) {
			this.server.close(() => {
				console.log('server closed');
			})
		}
	}
}


const appInstance = new App();
export const app = appInstance.app;
export default appInstance

