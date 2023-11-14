
import * as mongoose from "mongoose"
import { UserDocument } from "./user";

export interface SessionDocument extends mongoose.Document {
    userId: UserDocument["_id"]
    valid: boolean
    userAgent:string
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    userAgent:  {
        type: String,
    },
    valid: {
        type : Boolean,
        default: true
    }
}, { timestamps: true })


const SessionModel = mongoose.model<SessionDocument>("session", sessionSchema);

export default SessionModel
