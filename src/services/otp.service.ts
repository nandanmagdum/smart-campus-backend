import crypto from "crypto";
import mongoose from "mongoose";

import { Document, Schema } from "mongoose";
import { comparePasswords, hashPassword } from "./hash_password";
import { create } from "domain";
import { log } from "console";
import userModel from "../database/models/user.model";
import bcrypt from "bcrypt";

interface IOTPInterface extends Document {
    email: string,
    otp: string,
    createdAt: Date,
    expiry: number,
    verificationCount: number
};


const otpSchema = new mongoose.Schema<IOTPInterface>({
    email: { type: String, required: true}, 
    otp: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    expiry: { type: Number, expires: 300 }, // expires in 5 minutes
    verificationCount: {type: Number, default: 0}
}, {timestamps: true});

const otpModel = mongoose.model<IOTPInterface>('otp', otpSchema);

export async function generateOTP(email:string) {
    const randomBytes = await crypto.randomBytes(3); // Generate 3 random bytes (which is equivalent to 6 hexadecimal characters)
    const otp1 = parseInt(randomBytes.toString('hex'), 16) % 1000000; // Convert the bytes to a number and take modulo to ensure it's a 6-digit number
    const otp = otp1.toString();
    const createdAt = Date.now();
    console.log("+++++++++++++++++++++++ ", otp);

    // hash the password
    const hashedOTP = await hashPassword(otp);
    // const hashedOTP = otp;
    console.log("--------------------  ", hashedOTP);
    

    const newOTP = await otpModel.create({
        email: email,
        createdAt: createdAt,
        expiry: 300,
        otp: hashedOTP
    })
    console.log("Saved to DB");
    if(!newOTP){
        console.error(newOTP);
        console.error("Error creating new otp");
        return "error";
    }
    
    return otp;
}

const isOTPexpired = async(otpCreatedAt:Date, expiry:number):Promise<boolean> => {
    const createdTime = otpCreatedAt.getTime();
    const currentTime = Date.now();
    let timeDifference = currentTime - createdTime;
    timeDifference = timeDifference/1000;
    console.log("Time diffrence ", timeDifference);
    if(timeDifference > expiry){
        return true; 
    }
    return false;
}

export const verifyOTPRepo = async(email:string, otp:string):Promise<string> => {
    try {
        const otpInstance1 = await otpModel.find({email: email});
        const otpInstance = otpInstance1[otpInstance1.length -1];
        if(!otpInstance){
            await otpModel.deleteMany({email:email});
            return "Please try again";
        }
        // compre the otp with bcrypt hash
        const status = await comparePasswords(otp, otpInstance.otp);
        if(status === false){
            await otpModel.deleteOne({_id: otpInstance._id});
            await otpModel.deleteMany({email:email});
            return  "Wrong OTP";
        }
        // const newHashedOTP = otp;
        // const otpData = await otpModel.findOne({email: email, otp: newHashedOTP});
        // if(!otpData){
        //     console.log("No otp and email exact match with DB");
        //     return "OTP DB not found";
        // }
        if(otpInstance.verificationCount >= 1){
            await otpModel.deleteOne({_id: otpInstance._id});
            await otpModel.deleteMany({email:email});
            return "Please try sending otp again";
        }
        // check if it is expired or not 
        const expiryStatus = await isOTPexpired(otpInstance.createdAt, otpInstance.expiry);
        if(expiryStatus === true){
            await otpModel.deleteOne({_id: otpInstance._id});
            await otpModel.deleteMany({email:email});
            return "OTP Expired ! try again !";
        } else {
            const updatedOTPData =  await otpModel.findOneAndUpdate({_id: otpInstance._id}, {verificationCount: otpInstance.verificationCount+1}, {new: true});
            console.log(updatedOTPData?.verificationCount);
            await otpModel.deleteOne({_id: otpInstance._id});
            await otpModel.deleteMany({email:email});
            return "success";
        }
    } catch (error) {
        console.error(error);
        await otpModel.deleteMany({email:email});
        return "Server error";
    }
}