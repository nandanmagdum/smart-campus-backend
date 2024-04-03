import mongoose, { Document, Schema } from "mongoose";
import { IUserInterface } from "../interfaces/user.interface";

const userSchema = new Schema<IUserInterface>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    userType: {type: String, required: true, default: 'student'},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    phoneNumber : {type: String},
    profilePicture: {type: String},
    registrationId: {type: String}
});

const userModel = mongoose.model<IUserInterface>("userModel", userSchema);

export default userModel;