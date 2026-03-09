import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Medicine } from "../models/medicine.model.js";
import { Payment } from "../models/payment.model.js";
import { generateToken } from "../utilis/jwtToken.js";


//! Adding a new admin
export const addNewAdmin = asyncHandler(async (req, res, next) => {
    // taking the info from the admin
    const { firstName, lastName, email, phone, address, dob, gender, password } = req.body;

    // checking the info provided by the admin
    if (!firstName || !lastName || !email || !phone || !address || !dob || !gender || !password) {
        throw new ApiError(400, "Please Fill Full Form!");
    }

    // check if the admin already exists
    let existedAdmin = await User.findOne({ email });
    if (existedAdmin) {
        throw new ApiError(400, `${existedAdmin.role} with this Email already Registered`);
    }

    // finally create the user
    const createdAdmin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        dob,
        gender,
        password,
        role: "Admin",
    });
    generateToken(createdAdmin, "Admin Added Successfully!", 200, res);
});


//! Get all patients
export const getAllPatients = asyncHandler(async (req, res, next) => {
    const patients = await User.find({ role: "Patient" });
    res.status(200).json(new ApiResponse(200, patients, "All Patients List"));
});


//! Get all admins (staff)
export const getAllAdmins = asyncHandler(async (req, res, next) => {
    const admins = await User.find({ role: "Admin" });
    res.status(200).json(new ApiResponse(200, admins, "All Admins List"));
});


//! Dashboard statistics
export const getDashboardStats = asyncHandler(async (req, res, next) => {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await User.countDocuments({ role: "Patient" });
    const totalAdmins = await User.countDocuments({ role: "Admin" });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: "Pending" });
    const acceptedAppointments = await Appointment.countDocuments({ status: "Accepted" });
    const rejectedAppointments = await Appointment.countDocuments({ status: "Rejected" });
    const totalMedicines = await Medicine.countDocuments();
    const totalPayments = await Payment.countDocuments();

    // Get departments from doctors
    const departments = await Doctor.distinct("department.name");

    res.status(200).json(new ApiResponse(200, {
        totalDoctors,
        totalPatients,
        totalAdmins,
        totalAppointments,
        pendingAppointments,
        acceptedAppointments,
        rejectedAppointments,
        totalMedicines,
        totalPayments,
        totalDepartments: departments.length,
        departments,
    }, "Dashboard Statistics"));
});


//! Delete a doctor
export const deleteDoctor = asyncHandler(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }
    await doctor.deleteOne();
    res.status(200).json(new ApiResponse(200, {}, "Doctor Deleted Successfully"));
});


//! Get all payments
export const getAllPayments = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find();
    res.status(200).json(new ApiResponse(200, payments, "All Payments List"));
});


//! Get all medicines (admin)
export const getAllMedicines = asyncHandler(async (req, res, next) => {
    const medicines = await Medicine.find();
    res.status(200).json(new ApiResponse(200, medicines, "All Medicines List"));
});