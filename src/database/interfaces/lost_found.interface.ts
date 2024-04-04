import {Document} from "mongoose";


export interface ILostFoundInterface extends Document {
    item_name : string,
    description: string,
    status: 'lost' | 'found',
    image? : string,
    found_by?: string,
    found_location? : string,
    found_date?: Date,
    lost_by? : string,
    lost_location?: string,
    lost_date? : Date,
    claimed?: boolean,
    feedback?: string
};