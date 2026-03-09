import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Patient ID is required"],
    },
    patientFirstName: {
        type: String,
    },
    patientLastName: {
        type: String,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor ID is required"],
    },
    doctorFirstName: {
        type: String,
    },
    doctorLastName: {
        type: String,
    },
    experience: {
        type: String,
    },
    appointmentCharges: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment date is required"],
    },
    department: {
        type: String,
        required: [true, "department is required"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    // Medical fields — filled by the doctor
    diagnosis: {
        type: String,
        default: "",
    },
    prescription: {
        type: String,
        default: "",
    },
    medicalNotes: {
        type: String,
        default: "",
    },
    labTests: {
        type: [String],
        default: [],
    },
    treatmentStatus: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed", "Follow Up"],
        default: "Not Started",
    },
}, { timestamps: true });


export const Appointment = mongoose.model("Appointment", appointmentSchema);