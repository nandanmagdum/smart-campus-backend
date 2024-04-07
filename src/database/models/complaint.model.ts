import mongoose, {Document, Schema} from "mongoose";
import { IComplaintInterface } from "../interfaces/complaint.interface";

const complaintSchema = new Schema<IComplaintInterface>({
    email : {type: String , required: true},
    raiseTime : {type: Date },
    category: {type: String},
    description: {type: String, required: true},
    status : {type: String, default : 'pending'},
    committeeMember: {type: String},
    actions : {type: [Object], default: []},
    solutions: {type: [Object], default: []},
    anonymous: {type: Boolean, default: false},
    closedTime: {type: Date}
}, {timestamps:true});

const complaintModel = mongoose.model<IComplaintInterface>("complaintModel", complaintSchema);

export default complaintModel;