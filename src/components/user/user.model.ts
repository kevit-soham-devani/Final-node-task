import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'
import validator from "validator"
const { Schema,model} = mongoose;
import { Department, User_Role } from './user.enum';

/**
 * 
 * User Schema fot DB
 */

export interface UserInterface extends Document {
    role: User_Role,
    name: string,
    email:string,
    PhoneNumber:number,
    password:string,
    Department: Department,
    tokens: { token: string } [],
    addToken: (token:string) => Promise<void>;
    comparePassword(password: string): Promise<boolean>;

}

const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required:true
    },
    email:{
        type: Schema.Types.String,
        required: true,
        validate (value:string) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            } 
        }
    },
    PhoneNumber:{
        type: Schema.Types.Number,
        required: true
    },
    password: {
        type:Schema.Types.String,
        required:true,
        minlength: 7,
        trim: true,
        validate(value:string) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    department: {
        type: String,
        enum: Department,
        required: function () {
            return this.role === User_Role.Staff;
        },
    },
    role: {
        type: String,
        enum: User_Role,
        required: true,
    },
    semester:{
        type: Schema.Types.Number,
        required: true
    },
    tokens: [{
        token: { type: String,required:true } }]
    },
    {
    timestamps: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.pre("save", async function (next: any) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password , 10);
      }
      next();
    } catch (err) {
      next(err);
    }
  });

UserSchema.methods.addToken = async function (token: string) {
    this.tokens = this.tokens.concat({token})
    await this.save()
}

UserSchema.methods.comparePassword = async function (password:string) {
    return bcrypt.compare(password, this.password)
}

export const User = model<UserInterface>("User", UserSchema);