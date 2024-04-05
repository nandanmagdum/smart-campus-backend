import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IEventInterface } from "../database/interfaces/event.interface";
import userModel from "../database/models/user.model";
import eventModel from "../database/models/event.model";
dotenv.config();
const app_pass = process.env.email_pass;
if(!app_pass){
    console.error("Error getting app specigic password !");
    process.exit(1);
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user: "gceksmartcampus@gmail.com",
        pass: app_pass
    }
});

export const sendMailWithOTP = async(reciever:string, otp:string) => {

    try {
        const info = await transporter.sendMail({
            from: "GCEK Smart Campus <gceksmartcampus@gmail.com>",
            to: reciever,
            subject: "OTP for Smart Campus App",
            text: `${otp}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP for Smart Campus App</title>
            </head>
            <body>
                <h2>OTP for Smart Campus App</h2>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>Please use this OTP to complete the registration process.</p>
                <p>If you did not register for the Smart Campus App, please ignore this email.</p>
                <p>Best regards,<br>Smart Campus Team</p>
            </body>
            </html>
        `
        });
        console.log("////////////////////// ", "OTP sent to user's mail address");
        return "success";
    } catch (error) {
        console.error(error);
        return "error";
    }
}

export const sendMailToAll = async(event:IEventInterface) => {
    // get all emails
    const allUsers = await userModel.find({});
    const allMailIds = allUsers.map((user) => user.email);
    try {
        const info = await transporter.sendMail({
            from: "GCEK Smart Campus <gceksmartcampus@gmail.com>",
            to: "gceksmartcampus@gmail.com",
            bcc: allMailIds,
            subject: "New Event At GCEK !",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Event At GCEK</title>
</head>
<body>
    <h2>New Event at GCEK</h2>
    <p>Hello,</p>
    <p>We are excited to inform you that a new event has been booked at GCEK. Here are the event details:</p>
    <ul>
        <li><strong>Event Name:</strong> ${event.eventName}</li>
        <li><strong>Description:</strong> ${event.description}</li>
        <li><strong>Venue:</strong> ${event.venue}</li>
        <li><strong>Organized By:</strong> ${event.oraganizer}</li>
        <li><strong>Date:</strong> ${new Date(event.eventStartTime).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${new Date(event.eventStartTime).toLocaleTimeString()}</li>
    </ul>
    <p>Please try to attend this event and participate. Your presence will be highly appreciated.</p>
    <p>If you have any questions or need further information, feel free to contact us.</p>
    <p>Best regards,<br>Smart Campus Team</p>
</body>
</html>

        `
        });
        console.log("////////////////////// ", "invitation send to all the users");
        return "success";
    } catch (error) {
        console.error(error);
        return "error sending emails to all persons";
    }
}

export const sendRejectionMail = async(event:IEventInterface) => {
    const rejectedUser = await userModel.findOne({_id: event.requestedBy});
    if(!rejectedUser){
        return "Error getting the email of the requester";
    }
    const {email} = rejectedUser;

    try {
        const info = await transporter.sendMail({
            from: "GCEK Smart Campus <gceksmartcampus@gmail.com>",
            to: email,
            subject: "Your Request for an Event was rejected !",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Event At GCEK</title>
</head>
<body>
    <h2>Your Event request was rejected by the admin</h2>

    <p>Hello,</p>
    <p>We are sorry to inform you that a new event has been rejected at GCEK. Here are the event details:</p>
    <p>Reason for rejection : <strong>${event.canceldReason}</strong></p>
    <ul>
        <li><strong>Event Name:</strong> ${event.eventName}</li>
        <li><strong>Description:</strong> ${event.description}</li>
        <li><strong>Venue:</strong> ${event.venue}</li>
        <li><strong>Organized By:</strong> ${event.oraganizer}</li>
        <li><strong>Date:</strong> ${new Date(event.eventStartTime).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${new Date(event.eventStartTime).toLocaleTimeString()}</li>
    </ul>
    <p>Please try again after reading the rejection message !</p>
    <p>Best regards,<br>Smart Campus Team</p>
</body>
</html>
        `
        });
        console.log("////////////////////// ", "invitation send to all the users");
        return "success";
    } catch (error) {
        console.error(error);
        return "error sending emails to all persons";
    }
}


export const sendEventUpdateMail = async(event:IEventInterface) => {
    const allUsers = await userModel.find({});
    const allMailIds = allUsers.map((user) => user.email);
    if(!allUsers){
        return "Error getting the email of the requester";
    }

    try {
        const info = await transporter.sendMail({
            from: "GCEK Smart Campus <gceksmartcampus@gmail.com>",
            to: allMailIds,
            subject: "Update for an event",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Event At GCEK</title>
</head>
<body>
    <h2>Update for ${event.eventName}</h2>

    <p>Hello All,</p>
        <p><strong>${(event.eventUpdates[event.eventUpdates.length -1] as any).update}</strong></p>
       <p>Best regards,<br>Smart Campus Team</p>
</body>
</html>
        `
        });
        console.log("////////////////////// ", "invitation send to all the users");
        return "success";
    } catch (error) {
        console.error(error);
        return "error sending emails to all persons";
    }
}