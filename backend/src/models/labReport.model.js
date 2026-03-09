import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: [true, "Appointment ID is required"],
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        patientFirstName: { type: String },
        patientLastName: { type: String },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
        },
        doctorFirstName: { type: String },
        doctorLastName: { type: String },
        testName: {
            type: String,
            required: [true, "Test name is required"],
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },
        results: {
            type: String,
            default: "",
        },
        notes: {
            type: String,
            default: "",
        },
        reportFileUrl: {
            type: String,
            default: "",
        },
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LabTechnician",
        },
        technicianName: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export const LabReport = mongoose.model("LabReport", labReportSchema);
