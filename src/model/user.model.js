import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: { 
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        userType: {
            type: String,
            enum: ["free", "premium"],
            default: "free",
        },
        emailToken: {
            type: String,
        },
        photo: {
            type: String,
        },
        resetPasswordToken: {
            type: String,
            default: null,
        },
        resetPasswordExpiry: {
            type: Date,
            default: new Date(0),
        },
    },
    {
        timestamps: true,
        // toJSON: {
        //     transform: (doc, ret) => {
        //         delete ret.password;
        //         delete ret.__v;
        //         return ret;
        //     },
        // },
    }
)


export default mongoose.model("User", userSchema);