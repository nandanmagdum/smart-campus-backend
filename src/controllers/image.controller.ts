import {Request, Response} from "express";
import userModel from "../database/models/user.model";
import lostFoundModel from "../database/models/lost_found.model";
import eventModel from "../database/models/event.model";

export const uploadProfilePictureController = async(req:Request, res:Response) => {
    const {_id, url} = req.body;
    try {
        const user = await userModel.findOneAndUpdate({_id : _id}, {$set: {profilePicture : url}}, {new: true});
        if(!user){
            return res.status(400).json({"Error":"Error uploading profile picture"});
        }
        return res.status(200).json({"Success": "Uploaded User Profile Picture"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({});
    }
}

export const uploadItemImageController = async(req:Request, res:Response) => {
    const {_id, url} = req.body;
    try {
        const user = await lostFoundModel.findOneAndUpdate({_id : _id}, {$set: {image : url}}, {new: true});
        if(!user){
            return res.status(400).json({"Error":"Error uploading profile picture"});
        }
        return res.status(200).json({"Success": "Uploaded User Profile Picture"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({});
    }
}

export const uploadEventPictureController = async(req:Request, res:Response) => {
    const {_id, url} = req.body;
    try {
        const user = await eventModel.findOneAndUpdate({_id : _id}, {$set: {eventPosterUrl : url}}, {new: true});
        if(!user){
            return res.status(400).json({"Error":"Error uploading profile picture"});
        }
        return res.status(200).json({"Success": "Uploaded User Profile Picture"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({});
    }
}