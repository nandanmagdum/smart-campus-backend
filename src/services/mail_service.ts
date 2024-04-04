import nodemailer from "nodemailer";
import dotenv from "dotenv";
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