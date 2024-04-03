import { error } from "console";
import mongoose from "mongoose";

export const connect_to_mongoDB = async() => {
    const mongoDBUrl = process.env.MONGO_DB_URL;
    if(!mongoDBUrl){
        console.error("Mongo DB url not found !");
        process.exit(1);
    }
    mongoose.connect(mongoDBUrl, {})
    .then(() => {
        console.log("MongoDB Atlas connected !");
    })
    .catch((error) => {
        console.error("Error connecting MongoDB Atlas");
        console.log(error);
    });
}