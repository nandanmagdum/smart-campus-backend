import express, {Request, Response} from "express";
import { ILostFoundInterface } from "../database/interfaces/lost_found.interface";
import lostFoundModel from "../database/models/lost_found.model";
import { claimeAndClosedIssueRepo, getAllClosedIssuesRepo, getAllItemsRepo, getFoundItemsRaisedRepo,  getFoundItemsUnRaisedRepo,  getItemRepo, getLostItemsRepo, itemIsMineRepo, lostItemFoundRepo, newItemFoundRepo, raiseLostRepo } from "../repositories/lost_found.repository";
import { stat } from "fs";

export const raiseLostController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const lostData = await raiseLostRepo(data);
        if(lostData instanceof Error){
           return res.status(500).json({"Error": lostData.message});
        }
        return res.status(200).json(lostData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const lostItemFoundController = async(req:Request, res:Response) => {
    const data = req.body;
    
    try {
        const foundData = await lostItemFoundRepo(data);
        if(foundData instanceof Error){
           return res.status(500).json({"Error": foundData.message});
        }
        return res.status(200).json(foundData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const claimeAndClosedIssueController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const status = await claimeAndClosedIssueRepo(data.user_id, data._id,data.feedback, data.status);
        if(status instanceof Error){
           return res.status(500).json({"Error": status.message});
        }
        return res.status(200).json(status);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const newItemFoundController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const status = await newItemFoundRepo(data);
        if(status instanceof Error){
           return res.status(500).json({"Error": status.message});
        }
        return res.status(200).json(status);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const itemIsMineController = async(req:Request, res:Response) => {
    const data = req.body;
    try {
        const status = await itemIsMineRepo(data);
        if(status instanceof Error){
            return res.status(500).json({"Error": status.message});
        }
        return res.status(200).json(status);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllItemsController = async(req:Request, res:Response) => {
    try {
        const allItems = await getAllItemsRepo();
        if(allItems instanceof Error){
          return  res.status(500).json({"Error": allItems.message});
        }
        return res.status(200).json(allItems);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getLostItemsController = async(req:Request, res:Response) => {
    try {
        const allItems = await getLostItemsRepo();
        if(allItems instanceof Error){
          return  res.status(500).json({"Error": allItems.message});
        }
        return res.status(200).json(allItems);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getFoundItemsRaisedController = async(req:Request, res:Response) => {
    try {
        const allItems = await getFoundItemsRaisedRepo();
        if(allItems instanceof Error){
          return  res.status(500).json({"Error": allItems.message});
        }
        return res.status(200).json(allItems);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getFoundItemsUnRaisedController = async(req:Request, res:Response) => {
    try {
        const allItems = await getFoundItemsUnRaisedRepo();
        if(allItems instanceof Error){
          return  res.status(500).json({"Error": allItems.message});
        }
        return res.status(200).json(allItems);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getItemController = async(req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const Item = await getItemRepo(id);
        if(Item instanceof Error){
          return  res.status(500).json({"Error": Item.message});
        }
        return res.status(200).json(Item);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const getAllClosedIssuesController = async(req:Request, res:Response) => {
    try {
        const Item = await getAllClosedIssuesRepo();
        if(Item instanceof Error){
          return  res.status(500).json({"Error": Item.message});
        }
        return res.status(200).json( Item);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error": error});
    }
}

export const uploadItemImageController = async(req:Request, res:Response) => {
    const {_id, url} = req.body;
    try {
        const Item = await lostFoundModel.findOneAndUpdate({_id: _id}, {$set: {image: url}}, {new: true});
        if(!Item) {
            res.status(500).json({"Error": "Error uploading item image"});
        }
        return res.status(200).json({"Success":"Item image uploaded !"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Error" : error});
    }
}