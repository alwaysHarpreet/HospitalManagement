import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { generateToken } from "../utilis/jwtToken.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js"
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";


//! Adding a new doctor by admin only
export const addNewDoctor = asyncHandler(async (req, res, next) => {
    // taking the info from the admin
    let { firstName, lastName, email, phone, password, address, gender, department, specializations, qualifications, experience, availabelSlots, languagesKnown, appointmentCharges } = req.body;

    // checking the info provided by the admin
    if (!firstName || !lastName || !email || !phone || !password || !address || !gender || !department || !specializations || !qualifications || !experience || !availabelSlots || !languagesKnown || !appointmentCharges) {
        throw new ApiError(400, "Please Fill Full Form!");
    }

    // Parse JSON strings from FormData (multipart/form-data sends strings)
    if (typeof department === "string") department = JSON.parse(department);
    if (typeof address === "string") address = JSON.parse(address);
    if (typeof specializations === "string") specializations = JSON.parse(specializations);
    if (typeof qualifications === "string") qualifications = JSON.parse(qualifications);
    if (typeof availabelSlots === "string") availabelSlots = JSON.parse(availabelSlots);
    if (typeof languagesKnown === "string") languagesKnown = JSON.parse(languagesKnown);

    // check if the doctor already exists
    let existedDoctor = await Doctor.findOne({ email });
    if (existedDoctor) {
        throw new ApiError(400, `${existedDoctor.role} with this Email already Registered`);
    }

    // docAvatar
    const docAvatarLocalPath = req.file?.path;

    if (!docAvatarLocalPath) {
        throw new ApiError(400, "Doctor Avatar Path Not Found!");
    }

    const avatar = await uploadOnCloudinary(docAvatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Doctor Avatar is required")
    }

    // finally create the user
    const createdDoctor = await Doctor.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        address,
        gender,
        department,
        specializations,
        qualifications,
        experience,
        availabelSlots,
        languagesKnown,
        appointmentCharges,
        role: "Doctor",
        docAvatar: avatar.url,
    });
    generateToken(createdDoctor, "Dcotor Added Successfully!", 200, res);
});


//! Getting all doctors by user
export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await Doctor.find({ role: "Doctor" });

    res
        .status(200)
        .json(new ApiResponse(200, doctors, " DOCTORS LIST"));
});


//! Get doctor's appointment schedule
export const getMyAppointments = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const appointments = await Appointment.find({ doctor: doctorId }).sort({ appointmentDate: -1 });
    res.status(200).json(new ApiResponse(200, appointments, "Doctor appointments"));
});


//! Get patients for this doctor (unique patients from appointments)
export const getMyPatients = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const appointments = await Appointment.find({ doctor: doctorId });
    const patientIds = [...new Set(appointments.map(a => a.patient.toString()))];
    const patients = await User.find({ _id: { $in: patientIds } });
    res.status(200).json(new ApiResponse(200, patients, "Doctor's patients"));
});


//! Get single patient record with all their appointments
export const getPatientRecord = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { patientId } = req.params;
    const patient = await User.findById(patientId);
    if (!patient) throw new ApiError(404, "Patient not found");
    const appointments = await Appointment.find({ doctor: doctorId, patient: patientId }).sort({ appointmentDate: -1 });
    res.status(200).json(new ApiResponse(200, { patient, appointments }, "Patient record"));
});


//! Add diagnosis to an appointment
export const addDiagnosis = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { id } = req.params;
    const { diagnosis } = req.body;
    if (!diagnosis) throw new ApiError(400, "Diagnosis is required");

    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.diagnosis = diagnosis;
    await appointment.save();
    res.status(200).json(new ApiResponse(200, appointment, "Diagnosis added"));
});


//! Write prescription for an appointment
export const writePrescription = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { id } = req.params;
    const { prescription } = req.body;
    if (!prescription) throw new ApiError(400, "Prescription is required");

    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.prescription = prescription;
    await appointment.save();
    res.status(200).json(new ApiResponse(200, appointment, "Prescription saved"));
});


//! Upload medical notes for an appointment
export const uploadMedicalNotes = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { id } = req.params;
    const { medicalNotes } = req.body;
    if (!medicalNotes) throw new ApiError(400, "Medical notes are required");

    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.medicalNotes = medicalNotes;
    await appointment.save();
    res.status(200).json(new ApiResponse(200, appointment, "Medical notes saved"));
});


//! Recommend lab tests for an appointment
export const recommendLabTests = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { id } = req.params;
    const { labTests } = req.body;
    if (!labTests || !Array.isArray(labTests) || labTests.length === 0) {
        throw new ApiError(400, "At least one lab test is required");
    }

    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.labTests = labTests;
    await appointment.save();
    res.status(200).json(new ApiResponse(200, appointment, "Lab tests recommended"));
});


//! Update treatment status for an appointment
export const updateTreatmentStatus = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const { id } = req.params;
    const { treatmentStatus } = req.body;
    if (!treatmentStatus) throw new ApiError(400, "Treatment status is required");

    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.treatmentStatus = treatmentStatus;
    await appointment.save();
    res.status(200).json(new ApiResponse(200, appointment, "Treatment status updated"));
});


//! Get doctor dashboard stats
export const getDoctorDashboardStats = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;
    const appointments = await Appointment.find({ doctor: doctorId });
    const patientIds = [...new Set(appointments.map(a => a.patient.toString()))];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAppointments = appointments.filter(a => {
        const d = new Date(a.appointmentDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
    });

    res.status(200).json(new ApiResponse(200, {
        totalAppointments: appointments.length,
        totalPatients: patientIds.length,
        todayAppointments: todayAppointments.length,
        pending: appointments.filter(a => a.status === "Pending").length,
        accepted: appointments.filter(a => a.status === "Accepted").length,
        rejected: appointments.filter(a => a.status === "Rejected").length,
        inProgress: appointments.filter(a => a.treatmentStatus === "In Progress").length,
        completed: appointments.filter(a => a.treatmentStatus === "Completed").length,
        followUp: appointments.filter(a => a.treatmentStatus === "Follow Up").length,
    }, "Doctor dashboard stats"));
});

