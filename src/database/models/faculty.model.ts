import mongoose, { Document, Schema } from "mongoose";
import { IFacultyInterface } from "../interfaces/faculty.interface";

const facultySchema = new Schema<IFacultyInterface>({
    faculty_id: {type: String, required: true, unique: true},
    designation: {type: String, required: true},
    department: {type: String, required: true}
});

const facultyModel = mongoose.model<IFacultyInterface>("facultyModel", facultySchema);

export default facultyModel;

