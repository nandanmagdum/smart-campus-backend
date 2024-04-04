import mongoose from "mongoose";
import lostFoundModel from "../database/models/lost_found.model";
import { ILostFoundInterface } from "../database/interfaces/lost_found.interface";

export const raiseLostRepo = async(lostData:ILostFoundInterface):Promise<ILostFoundInterface | Error> => {
    try {
        const raiseLost = await lostFoundModel.create(lostData);
        if(!raiseLost){
            return Error("Error inserting the lost data");
        } 
        return raiseLost;
    } catch (error) {
        console.error(error);
        return Error("Error inserting the lost riase issue");
    }
}

export const lostItemFoundRepo = async(foundData:ILostFoundInterface):Promise<ILostFoundInterface | Error> => {
    try {
        const lostFoundItem = await lostFoundModel.findOne({_id: foundData._id});
        console.log(lostFoundItem);
        
        if(!lostFoundItem){
            return Error("Error getting the item details");
        }
        lostFoundItem.found_by = foundData.found_by;
        lostFoundItem.found_location = foundData.found_location;
        lostFoundItem.status = foundData.status;
        const itemInfo = await lostFoundModel.findOneAndUpdate({_id: foundData._id}, 
            lostFoundItem
        , {new: true});
        if(!itemInfo){
            return Error("Error inserting the lost data");
        } 
        return itemInfo;
    } catch (error) {
        console.error(error);
        return Error("Error inserting the found raise issue");
    }
}

export const claimeAndClosedIssueRepo = async(userid:string, item_id:string,feedback:string, status:"lost"|"found"):Promise<string | Error> => {
    try {
        const lostFoundItem = await lostFoundModel.findOne({_id: item_id});
        if(!lostFoundItem){
            return Error("Requested Item not found !");
        }
        lostFoundItem.feedback = feedback;
        lostFoundItem.status = status;  
        lostFoundItem.claimed = true;
        const updatedOperation = await lostFoundModel.updateOne({_id: lostFoundItem._id} , lostFoundItem, {new:true});
        if(!updatedOperation){
            return Error("Error upadting the item data !");
        }
        return "success";
    } catch (error) {
        console.error(error);
        return Error("Error inserting the found raise issue");
    }
}

export const newItemFoundRepo = async(data:ILostFoundInterface):Promise<ILostFoundInterface | Error> => {
    try {
        const addnewItem = await lostFoundModel.create(data);
        if(!addnewItem){
            return Error("Client Side Error for adding new found item");
        }
        return addnewItem;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for adding new found item");
    }
}

export const itemIsMineRepo = async(data:ILostFoundInterface):Promise<ILostFoundInterface | Error> => {
    try {
        const lostFoundItem = await lostFoundModel.findOne({"_id": data._id});
        if(!lostFoundItem){
            return Error("Item not found !");
        }
        lostFoundItem.status = data.status;
        lostFoundItem.feedback = data.feedback;
        lostFoundItem.lost_by  = data.lost_by;
        lostFoundItem.lost_location = data.lost_location;
        const updateOperation = await lostFoundModel.findOneAndUpdate({_id: lostFoundItem._id}, lostFoundItem, {new: true});
        if(!updateOperation){
            return Error("Error in updating the data please try again");
        }
        return updateOperation;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for adding item is mine api");
    }
}

export const getAllItemsRepo = async():Promise<ILostFoundInterface[] | Error> => {
    try {
        const all = await lostFoundModel.find({});
        if(!all){
            return Error("Error getting all the items");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting all items");
    }
}

export const getLostItemsRepo = async():Promise<ILostFoundInterface[] | Error> => {
    try {
        const all = await lostFoundModel.find({status: "lost"});
        if(!all){
            return Error("Error getting all the lost items");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting lost items");
    }
}

export const getFoundItemsRaisedRepo = async():Promise<ILostFoundInterface[] | Error> => {
    try {
        const all = await lostFoundModel.find({"lost_by": {$ne: null}});
        if(!all){
            return Error("Error getting all the found items");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting found items");
    }
}

export const getFoundItemsUnRaisedRepo = async():Promise<ILostFoundInterface[] | Error> => {
    try {
        const all = await lostFoundModel.find({"lost_by": null});
        if(!all){
            return Error("Error getting all the found items");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting found items");
    }
}

export const getItemRepo = async(id:string):Promise<ILostFoundInterface| Error> => {
    try {
        const all = await lostFoundModel.findOne({_id: id});
        if(!all){
            return Error("Error getting all the found items");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting a item");   
    }
}

export const getAllClosedIssuesRepo = async():Promise<ILostFoundInterface[] | Error> => {
    try {
        const all = await lostFoundModel.find({"claimed": true});
        if(!all){
            return Error("Error getting all the closed issues");
        } 
        return all;
    } catch (error) {
        console.log(error);
        return Error("Internal Server Error for getting all closed issues");
    }
}