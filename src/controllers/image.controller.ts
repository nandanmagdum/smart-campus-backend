import {Request, Response} from "express";
import userModel from "../database/models/user.model";

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