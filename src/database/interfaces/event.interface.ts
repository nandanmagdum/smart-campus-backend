import { Document } from "mongoose";

export interface IEventInterface extends Document {
    eventName: string,
    description: string,
    venue: string,
    oraganizer: string,
    category: string,
    eventStartTime: Date,
    eventEndTime: Date,
    requestedBy: string,
    requestedDateTime: Date,
    eventStatus : 'requested' | 'booked' | 'occured' | 'rejected',
    eventPosterUrl?: string,
    acceptedDateTime? : Date,
    bookedBy? : string,
    canceldBy?: string,
    canceldReason?: string,
    eventUpdates: Object[],
    interestedPeople: string[],
};

export interface IUpdateInterface extends Document {
    time: Date,
    update: string
}