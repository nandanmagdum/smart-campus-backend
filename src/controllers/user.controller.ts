import { Request, Response } from "express";
import { createFacultyRepo, createStudentRepo, deleteUserRepo, getAllFacultiesRepo, getAllStudentsRepo, getAllUsersRepo} from "../repositories/user.repository";
import { combineArrays} from "../services/combine_arrays";
import eventModel from "../database/models/event.model";

export const createStudentController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const user = await createStudentRepo(data);
        if(!user){
            return res.status(500).json({"Error": "Error Registering Student data, please try again"});
        }
        return res.status(200).json({"User": user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const createFacultyController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const user = await createFacultyRepo(data);
        if(!user){
            return res.status(500).json({"Error": "Error Registering Faulty data, please try again"});
        }
        return res.status(200).json({"Faculty": user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllUsersController = async(req:Request, res:Response) => {
    try {
        const allusers = await getAllUsersRepo();
        const allStudents = await getAllStudentsRepo();
        const allFaculties = await getAllFacultiesRepo();
        if(!allusers || !allStudents || !allFaculties){
            return res.status(500).json({"Error" : "Users not found"});
        }
        // combine all objects
        const SUPER_DATA = await combineArrays(allusers, allStudents, allFaculties);
        return res.status(200).json({"All Users": SUPER_DATA});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllStudentsController = async(req:Request, res:Response) => {
    try {
        const allStudents = await getAllStudentsRepo();
        if(!allStudents){
            return res.status(500).json({"Error": "Error getting all students"});
        }
        return res.status(200).json({"All Students":allStudents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllFacultiesController = async(req:Request, res:Response) => {
    try {
        const allFaculties = await getAllFacultiesRepo();
        if(!allFaculties){
            return res.status(500).json({"Error": "Error getting all Faculties"});
        }
        return res.status(200).json({"All Faculties":allFaculties});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const deleteUserController = async(req:Request, res:Response) => {
    const user_id = req.params.id;
    try {
        const deletedUser = await deleteUserRepo(user_id);
        if(!deletedUser){
            return res.status(500).json({"Error": "Deleting the user"});
        }
        return res.status(200).json({"Success": "User deleted succesfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllEventsController = async(req:Request, res:Response) => {
    try {
        const allEvents = await eventModel.find({});
        if(!allEvents){
          return res.status(404).json({"Error": "Error getting all events"});
        }
        return res.status(200).json({"All Events": allEvents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getPastEventsContoller = async(req:Request, res:Response) => {
    try {
        const pastEvents = await eventModel.find({eventEndTime : {$lt: Date.now()}});
        if(!pastEvents){
          return res.status(404).json({"Error": "Error getting all past events"});
        }
        return res.status(200).json({"Past Events": pastEvents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getFutureEventsController = async(req:Request, res:Response) => {
    try {
        const pastEvents = await eventModel.find({eventStartTime : {$gt: Date.now()}});
        if(!pastEvents){
          return res.status(404).json({"Error": "Error getting all future events"});
        }
        return res.status(200).json({"Future Events": pastEvents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getUsersEventsContoller = async(req:Request, res:Response) => {
    const user_id = req.params.user_id;
    try {
        const usersEvents = await eventModel.find({requestedBy: user_id});
        if(!usersEvents){
          return res.status(404).json({"Error": "Error getting users events"});
        }
        return res.status(200).json({"Users Events": usersEvents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getEventBYDateController = async(req:Request, res:Response) => {
    const dateString = req.body.date;
     const dateComponents = dateString.split('/');
     const day = parseInt(dateComponents[0], 10);
     const month = parseInt(dateComponents[1], 10) - 1;
     const year = parseInt(dateComponents[2], 10);
     const date = new Date(year, month, day);
     const startOfDay = new Date(year, month, day, 0, 0, 0);
     const endOfDay = new Date(year, month, day, 23, 59, 59);
    try {
        const eventsAtThatDay = await eventModel.find({eventStartTime: {
            $gte: startOfDay,
            $lte: endOfDay
        }});
        if(!eventsAtThatDay){
          return res.status(404).json({"Error": "Error getting  event that day"});
        }
        if(eventsAtThatDay.length === 0){
            return res.status(203).json({"Event":"No Event on this day"});
        }
        return res.status(200).json({"Users Events": eventsAtThatDay});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getEventController = async(req:Request, res:Response) => {
    const event_id = req.params.event_id;
    try {
        const event = await eventModel.find({_id: event_id});
        if(!event){
            return res.status(404).json({"Error": "Event not found"});
        }
        return res.status(200).json({"Event":event});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getRequestedEventsController = async(req:Request, res:Response) => {
    try {
        const requestedEvents = await eventModel.find({eventStatus : "requested"});
        if(!requestedEvents){
            return res.status(404).json({"Error": "Requested Events not found"});
        }
        if(requestedEvents.length === 0){
            return res.status(202).json({"Requested Events": "There are not requested events"});
        }
        return res.status(200).json({"Requested Events": requestedEvents});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}