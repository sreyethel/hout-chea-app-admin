import config from "./config.store";
import app from "./setup.store";

export default function () {
	const stores = config();
	return app(stores);
}
