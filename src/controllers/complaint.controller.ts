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

export const updateComplaintController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const updatedComplaint = await complaintModel.findOneAndUpdate({_id: data._id} , data, {new: true});
        if(!updatedComplaint){
            res.status(500).json({"Error": "Error creating the complaint"});
        }
        return res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const changeStatusController = async(req:Request, res:Response) => {
    const {status, _id}  = req.body;
    try {
        const updatedComplaint = await complaintModel.findOneAndUpdate({_id: _id}, {$set: {status: status}} , {new: true});
        if(!updatedComplaint) {
            return res.status(500).json({"Error":"Error uploading the error"});
        }
        return res.status(200).json(updatedComplaint);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const addActionController = async(req:Request, res:Response) => {
    const {_id, time, action} = req.body;
    try {
        const updatedComplaint = await complaintModel.findOneAndUpdate({_id: _id}, {$push : {actions: {"time": time, "action": action}}} , {new: true});
        if(!updatedComplaint) {
            return res.status(500).json({"Error":"Error uploading the error"});
        }
        return res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const addSolutionController = async(req:Request, res:Response) => {
    const {_id, time, solution} = req.body;
    try {
        const updatedComplaint = await complaintModel.findOneAndUpdate({_id: _id}, {$push : {solutions: {"time": time, "solution": solution}}} , {new: true});
        if(!updatedComplaint) {
            return res.status(500).json({"Error":"Error uploading the error"});
        }
        return res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const closeComplaintController = async(req:Request, res:Response) => {
    const {_id} = req.body;
    try {
        const updatedComplaint = await complaintModel.findOneAndUpdate({_id: _id}, {$set : {status: "closed"}} , {new: true});
        if(!updatedComplaint) {
            return res.status(500).json({"Error":"Error uploading the error"});
        }
        return res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const deleteComplaintController = async(req:Request, res:Response) => {
    const {_id} = req.body;
    try {
        const updatedComplaint = await complaintModel.findByIdAndDelete(_id);
        if(!updatedComplaint) {
            return res.status(500).json({"Error":"Error uploading the error"});
        }
        return res.status(200).json({"Complaint Deleted":updatedComplaint });
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}