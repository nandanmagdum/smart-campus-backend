import { Request, Response } from "express";
import { IEventInterface } from "../database/interfaces/event.interface";
import eventModel from "../database/models/event.model";
import { checkIfEventsClash, requestEventRepo } from "../repositories/event.repository";
import { registerUserController } from "./auth.controller";
import { sendEventUpdateMail, sendMailToAll, sendRejectionMail } from "../services/mail_service";

export const requestEventController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const result = await checkIfEventsClash(data);
        if(result instanceof Error){
            return res.status(500).json({"Error": result.message});
        }
        if(result === true){
            const requestedEvent = await requestEventRepo(data);
            if(!requestedEvent){
                return res.status(500).json({"Error":"Events don't clash, please try again requesting"});
            }
            return res.status(200).json({"Event Requested" : requestedEvent});
        }
        console.log(result);
        return res.status(400).json({"Requested Event Clash with this Event" : result});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}

export const acceptEventController = async(req:Request, res:Response) => {
    const data = req.body;
    const event_id = req.params.event_id;
    try {
        const oldEvent = await eventModel.findById(event_id);
        if(!oldEvent){
            return res.status(500).json({"Error":"Requested Event not found"});
        }
        oldEvent.eventStatus = "booked";
        oldEvent.bookedBy = data.bookedBy;
        oldEvent.acceptedDateTime = data.acceptedDateTime;
        const newEvent = await eventModel.findOneAndUpdate({_id: oldEvent._id}, oldEvent, {new: true});
        if(!newEvent){
            return res.status(500).json({"Error": "Error updating the event data , please try again !"});
        }
        await sendMailToAll(newEvent);
        return res.status(200).json({"Event Booked":newEvent});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}

export const rejectEventController = async(req:Request, res:Response) => {
    const data = req.body;
    const event_id = req.params.event_id;
    try {
        const oldEvent = await eventModel.findOne({_id: event_id});
        if(!oldEvent){
            return res.status(500).json({"Error": "Event not found"});
        }
        oldEvent.eventStatus = "rejected";
        oldEvent.canceldBy = data.canceldBy;
        oldEvent.canceldReason = data.canceldReason;
        const newEvent = await eventModel.findOneAndUpdate({_id: oldEvent._id}, oldEvent, {new: true});
        if(!newEvent){{
            return res.status(500).json({"Error" : "Error rejecting the request, please try again !"});
        }}
        await sendRejectionMail(newEvent);
        // send mail to requester only that your request is rejected
        return res.status(200).json({"Event rejected" : newEvent});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}

export const updateEventController = async(req:Request, res:Response) => {
    const event_id = req.params.event_id;
    const data = req.body;
    try {
        const oldEvent = await eventModel.findOne({_id: event_id});
        if(!oldEvent){
            return res.status(500).json({"Error": "Event not found"});
        }
        const newEvent = await eventModel.findOneAndUpdate({_id: oldEvent._id}, {$push: {eventUpdates: data}}, {new: true});
        if(!newEvent){{
            return res.status(500).json({"Error" : "Error updating the event, please try again !"});
        }}
        await sendEventUpdateMail(newEvent);
        // send mail to requester only that your request is rejected
        return res.status(200).json({"Event Updated" : newEvent});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}

export const markAsDoneController = async(req:Request, res:Response) => {
    const event_id = req.params.event_id;
    try {
        const updateOperation = await eventModel.findOneAndUpdate({_id: event_id}, {$set: {eventStatus: "occured"}}, {new: true});
        if(!updateOperation){
           return  res.status(500).json({"Error": "Error updating the status"});
        }
        return res.status(200).json({"MarkedAsDone": updateOperation});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}

export const addInterestedPersonController = async(req:Request, res:Response) => {
    const {user_id, event_id} = req.body;
    try {
        const event = await eventModel.findById(event_id);
        if(!event){
           return  res.status(404).json({"Error":"Event not found"});
        }
        const userExists =  event.interestedPeople.includes(user_id);
        if(userExists){
            return res.status(201).json({"Status":"Interest Already Marked"});
        }

        const updateOperation = await eventModel.findOneAndUpdate({_id:event_id} , {$push : {interestedPeople: user_id}}, {new: true});
        if(!updateOperation){
            return res.status(404).json({"Error":"Error Adding interested person"});
        }
        return res.status(200).json({"Event": updateOperation});
    } catch (error) {
        console.error(error);
        res.status(500).json({"Error": error});
    }
}