import mongoose from "mongoose";
import { Department } from "../../components/user/user.enum";

const { Schema, model} = mongoose

export interface IStudent extends Document {
    name:string;
    rollNumber:string;
    mobileNumber: number;
    batch:string;
    semester:number;
    role:string
}

const studentSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        required: true
    },
    rollNumber: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Schema.Types.Number,
        required: true,
        unique: true
    },
    department: {
        enum: Department,
        type: String,
        required: true,
    },
    batch: {
        type: Number,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['student'],
        immutable: true,
    },
    },
    {
        timestamps:true
    }
)

const Student = model<IStudent>('Student', studentSchema);
export default Student;

