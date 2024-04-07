import { DateSchemaDefinition, Document } from "mongoose";

export interface IComplaintInterface extends Document {
    email: string,
    raiseTime: Date,
    category: string,
    description: string,
    status: 'pending' | 'under_review' | 'resolved' | 'closed',
    committeeMember?: string,
    actions: string[],
    solutions: string[],
    anonymous: boolean,
    closedTime: Date
}