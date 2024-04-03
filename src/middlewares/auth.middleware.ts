import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const screat_key = process.env.jwt_screat;
if(!screat_key){
    console.error("Screat key not found !");
    process.exit(1);
}

export const authenticateUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        // check for jwt from headers
        const token = req.headers.authorization;
        // if absent => error
        if(!token){
            return res.status(401).json({"Authentication Error": "Token Absent"});
            
        }
        // if present => verify
        const isVerifiedToken = await jwt.verify(token, screat_key);
        // if expired => error
        if(!isVerifiedToken){
           return  res.status(401).json({"Authentication Error": "Token has expired"});
        }
        // if verified => next function
        next();
    } catch (error) {
        console.error(error);
       return res.status(401).json({"Authentication Error": error});
    }
}