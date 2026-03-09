import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const labTechnicianSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [3, "First Name must have at least 3 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [3, "Last Name must have at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            validate: [validator.isEmail, "Email is invalid"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            minLength: [10, "Phone Number must contain exactly 10 digits"],
            maxLength: [10, "Phone Number must contain exactly 10 digits"],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must contain at least 8 characters"],
            select: false,
        },
        gender: {
            type: String,
            required: [true, "Gender is required!"],
            enum: ["Male", "Female"],
        },
        department: {
            type: String,
            default: "Laboratory",
        },
        role: {
            type: String,
            default: "LabTechnician",
            enum: ["LabTechnician"],
        },
    },
    { timestamps: true }
);

labTechnicianSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

labTechnicianSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

labTechnicianSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const LabTechnician = mongoose.model("LabTechnician", labTechnicianSchema);
