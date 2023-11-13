import * as mongoose from "mongoose"

export interface UserInput {
  email: string;
  username: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username:  {
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
}, { timestamps: true })


const UserModel = mongoose.model<UserDocument>("user", userSchema);

export default UserModel
