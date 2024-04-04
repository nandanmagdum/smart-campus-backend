import mongoose, { Document, Schema } from "mongoose";
import { ILostFoundInterface } from "../interfaces/lost_found.interface";

const lostFoundSchema = new Schema<ILostFoundInterface>({
    item_name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    image: {type: String},
    found_by: {type: String},
    found_location : {type: String},
    found_date: {type: Date},
    lost_by: {type: String},
    lost_location: {type: String},
    lost_date: {type: Date},
    claimed: {type: Boolean},
    feedback: {type: String}
}, {timestamps: true});

const lostFoundModel = mongoose.model<ILostFoundInterface>("lost_found", lostFoundSchema);

export default lostFoundModel;