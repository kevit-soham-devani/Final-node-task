/**Config.ts */
interface ConfigType {
	server: {
		port: number | string;
	};
	mongodb: {
		url: string;
	};
}

const Config: ConfigType = {
	server: {
		port: process.env.PORT || 3004,
	},
	mongodb: {
		url:
			process.env.MONGODB_URL ||
			"mongodb://127.0.0.1:27017/clg_database",
	},
};
export default Config;
