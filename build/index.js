"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_db_connection_1 = require("./database/mongo_db_connection");
const skip_auth_middleware_1 = require("./middlewares/skip_auth.middleware");
dotenv_1.default.config();
// app and server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// express configurations
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set("PORT", 8000);
// auth middleware
app.use(skip_auth_middleware_1.skipAuth);
// connect to mongoDB
(0, mongo_db_connection_1.connect_to_mongoDB)();
// routes
app.use("/api/v1", routes_1.default);
// listen to requests
try {
    const port = app.get("PORT");
    server.listen(port, () => {
        console.log(`Server is listening to port ${port}`);
    });
}
catch (error) {
    console.error(error);
}
exports.default = server;
