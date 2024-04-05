import mongoose from "mongoose";
import { IEventInterface } from "../database/interfaces/event.interface";
import eventModel from "../database/models/event.model";
import { IUserInterface } from "../database/interfaces/user.interface";

export const requestEventRepo = async(newEvent:IEventInterface):Promise<IEventInterface | Error> => {
    try {
        const requestedEvent = await eventModel.create(newEvent);
        if(!requestedEvent){
            return Error("Client Side Error");
        }
        return requestedEvent;
    } catch (error) {
        console.error(error);
        return Error("Internal Server Error for requesting error");
    }
} 

export const checkIfEventsClash = async(requestedEvent:IEventInterface):Promise<IEventInterface | boolean | Error> => {
    // get all the events data that are requested and booked 
    const allEvents = await eventModel.find({eventStatus: {$in: ["requested", "booked"]}});
    if(!allEvents){
        return Error("Error getting all the events");
    }
    if(allEvents.length === 0){
        return true;
    }
    for(const event of allEvents){
        const result = doEventsClash(event, requestedEvent);
        if(result === true){
            return event;
        }
    }
    return true;
}

function doEventsClash(event1:IEventInterface, event2:IEventInterface) {
    // Extract start and end times of both events
    const start1 = new Date(event1.eventStartTime).getTime();
    const end1 = new Date(event1.eventEndTime).getTime();
    const start2 = new Date(event2.eventStartTime).getTime();
    const end2 = new Date(event2.eventEndTime).getTime();

    // Check if the intervals overlap
    if ((start1 <= start2 && start2 < end1) || (start2 <= start1 && start1 < end2)) {
        // There's an overlap
        return true;
    } else {
        // No overlap
        return false;
    }
}