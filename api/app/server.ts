import express, {Express} from "express";
import cors from "cors";
import http from "http";
import log4js, {Logger} from "log4js";
import routes from "./routes";

const env: undefined | string = process.env.NODE_ENV;

log4js.configure({
    appenders: {console: {type: "console", layout: {type: "colored"}}},
    categories: {default: {appenders: ["console"], level: "DEBUG"}},
});

const log: Logger = log4js.getLogger("server");
log.info("Environment was set to [" + env + "]");

const app: Express = express();
app.use(express.json());
app.use(cors());

routes.configure(app);

export default (() => {
    return http.createServer(app);
})();
