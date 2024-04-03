import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user: "codinghero1234@gmail.com",
        pass: "rqdfitlbhzeyfbxb"
    }
});

export const sendMailWithOTP = async(reciever:string, otp:string) => {

    try {
        const info = await transporter.sendMail({
            from: "Denis Ritche <codinghero1234@gmail.com>",
            to: reciever,
            subject: "OTP for Smart Campus App",
            text: `${otp}`
        });
        console.log("////////////////////// ", "OTP sent to user's mail address");
        return "success";
    } catch (error) {
        console.error(error);
        return "error";
    }
}