import {Request, Response} from "express";
import { IComplaintInterface } from "../database/interfaces/complaint.interface";
import complaintModel from "../database/models/complaint.model";

export const getAllComplaintsController = async(req:Request, res:Response) => {
    try {
        const allComplaints = await complaintModel.find({});
        if(!allComplaints) {
            return res.status(404).json({"Error": "Error fetching all the complaints"});
        }
        return res.status(200).json({"All Complaints": allComplaints});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getComplaintController = async(req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const allComplaints = await complaintModel.find({_id: id});
        if(!allComplaints) {
            return res.status(404).json({"Error": "Error fetching all the complaints"});
        }
        return res.status(200).json({"All Complaints": allComplaints});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const createComplaintController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const newComplaint = await complaintModel.create(data);
        if(!newComplaint){
            res.status(500).json({"Error": "Error creating the complaint"});
        }
        return res.status(200).json({"New Complaint": newComplaint});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}