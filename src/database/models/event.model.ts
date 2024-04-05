import mongoose, {Document, Schema} from "mongoose";
import { IEventInterface } from "../interfaces/event.interface";

const eventSchema = new Schema<IEventInterface>({
    eventName: {type: String, required: true},
    description: {type: String, required: true},
    venue: {type: String, required: true},
    oraganizer: {type: String, required: true},
    category: {type: String, required: true},
    eventStartTime: {type: Date, required: true},
    eventEndTime: {type: Date, required: true},
    requestedBy: {type: String, required: true},
    requestedDateTime: {type: Date, required: true},
    eventStatus : {type: String, default: "requested"},
    eventPosterUrl: {type: String},
    acceptedDateTime : {type: Date},
    bookedBy : {type: String} ,
    canceldBy: {type: String},
    canceldReason: {type: String},
    eventUpdates: {type: [Object] , default: []},
    interestedPeople: {type: [String] , default: []},
}, {timestamps: true});

const eventModel = mongoose.model<IEventInterface>("eventModel", eventSchema);

export default eventModel;