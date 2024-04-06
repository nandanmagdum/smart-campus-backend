import mongoose, { Document, Schema } from "mongoose";
import { IStudentInterface } from "../interfaces/student.interface";

const studentSchema = new Schema<IStudentInterface>({
    email: {type: String, required: true, unique: true},
    passout_year: {type: Number, required: true},
    program: {type: String, required: true},
    department: {type: String, required: true},
}, {timestamps: true});

const studentModel = mongoose.model<IStudentInterface>("studentModel", studentSchema);

export default studentModel;