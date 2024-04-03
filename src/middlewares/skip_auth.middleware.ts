import {Request, Response, NextFunction} from "express";
import { authenticateUser } from "./auth.middleware";

export const skipAuth = async(req:Request, res:Response, next:NextFunction) => {
    
    if(req.path == "/api/v1/auth/register" || req.path == "/api/v1/auth/login"){
    console.log("++++++++++++++++",req.path);

        next();
    }else {
    console.log("----------------------",req.path);

        authenticateUser(req, res, next);
    }
}