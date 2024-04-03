import express, {Express} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import router from "./routes/routes";
import dotenv from "dotenv";
import { connect_to_mongoDB } from "./database/mongo_db_connection";
import { skipAuth } from "./middlewares/skip_auth.middleware";
dotenv.config();

// app and server
const app:Express = express();
const server = http.createServer(app);

// express configurations
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("PORT", 8000);

// auth middleware
app.use(skipAuth);

// connect to mongoDB
connect_to_mongoDB();

// routes
app.use("/api/v1",router);

// listen to requests
try {
    const port = app.get("PORT");
    server.listen(port, () => {
        console.log(`Server is listening to port ${port}`);
    });
} catch (error) {
    console.error(error);
}

export default server;