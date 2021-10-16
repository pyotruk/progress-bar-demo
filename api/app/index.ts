import dotenv from "dotenv";
import server from "./server";
import log4js from "log4js";

dotenv.config();
const log = log4js.getLogger("app");

server.listen(process.env.NODE_PORT || 8000, () => {
    log.info("Server is listening on address:", server.address());
});
