import { Document } from "mongoose";

export interface IUserInterface extends Document {
    username: string,
    password: string,
    email: string,
    userType: string,
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    // optional fields
    middleName?: string,
    phoneNumber?: string,
    profilePicture?: string,
    registrationId?: string,
};