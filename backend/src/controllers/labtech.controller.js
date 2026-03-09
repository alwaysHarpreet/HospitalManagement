import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { LabTechnician } from "../models/labTechnician.model.js";
import { LabReport } from "../models/labReport.model.js";
import { Appointment } from "../models/appointment.model.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js";
import { generateToken } from "../utilis/jwtToken.js";


//! Add new lab technician (admin only)
export const addLabTechnician = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender) {
        throw new ApiError(400, "Please fill all fields!");
    }

    const existing = await LabTechnician.findOne({ email });
    if (existing) {
        throw new ApiError(400, "Lab Technician with this email already exists");
    }

    const labTech = await LabTechnician.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        role: "LabTechnician",
    });

    res.status(201).json(new ApiResponse(201, labTech, "Lab Technician added successfully!"));
});


//! Get lab technician details (self)
export const getLabTechDetails = asyncHandler(async (req, res, next) => {
    const labTech = req.labTech;
    res.status(200).json(new ApiResponse(200, labTech, "Lab Technician details"));
});


//! Get all test requests (appointments with labTests)
export const getTestRequests = asyncHandler(async (req, res, next) => {
    // Find appointments that have lab tests recommended
    const appointments = await Appointment.find({
        labTests: { $exists: true, $ne: [] },
        status: "Accepted",
    }).sort({ updatedAt: -1 });

    // For each appointment, check which tests have LabReport records and which don't
    const testRequests = [];
    for (const apt of appointments) {
        for (const testName of apt.labTests) {
            const existingReport = await LabReport.findOne({
                appointment: apt._id,
                testName: testName,
            });

            testRequests.push({
                appointmentId: apt._id,
                patientId: apt.patient,
                patientName: `${apt.patientFirstName} ${apt.patientLastName}`,
                doctorName: `Dr. ${apt.doctorFirstName} ${apt.doctorLastName}`,
                department: apt.department,
                appointmentDate: apt.appointmentDate,
                testName,
                reportId: existingReport?._id || null,
                reportStatus: existingReport?.status || "Pending",
            });
        }
    }

    res.status(200).json(new ApiResponse(200, testRequests, "Test requests"));
});


//! Upload lab report for a test
export const uploadLabReport = asyncHandler(async (req, res, next) => {
    const techId = req.labTech._id;
    const { appointmentId, testName, results, notes } = req.body;

    if (!appointmentId || !testName) {
        throw new ApiError(400, "Appointment ID and test name are required");
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new ApiError(404, "Appointment not found");

    if (!appointment.labTests.includes(testName)) {
        throw new ApiError(400, "This test was not requested for this appointment");
    }

    // Upload report file to cloudinary if provided
    let reportFileUrl = "";
    if (req.file) {
        const uploaded = await uploadOnCloudinary(req.file.path);
        if (uploaded) reportFileUrl = uploaded.url;
    }

    // Check if report already exists
    let report = await LabReport.findOne({ appointment: appointmentId, testName });

    if (report) {
        // Update existing report
        report.results = results || report.results;
        report.notes = notes || report.notes;
        if (reportFileUrl) report.reportFileUrl = reportFileUrl;
        report.technician = techId;
        report.technicianName = `${req.labTech.firstName} ${req.labTech.lastName}`;
        report.status = "Completed";
        await report.save();
    } else {
        // Create new report
        report = await LabReport.create({
            appointment: appointment._id,
            patient: appointment.patient,
            patientFirstName: appointment.patientFirstName,
            patientLastName: appointment.patientLastName,
            doctor: appointment.doctor,
            doctorFirstName: appointment.doctorFirstName,
            doctorLastName: appointment.doctorLastName,
            testName,
            status: "Completed",
            results: results || "",
            notes: notes || "",
            reportFileUrl,
            technician: techId,
            technicianName: `${req.labTech.firstName} ${req.labTech.lastName}`,
        });
    }

    res.status(200).json(new ApiResponse(200, report, "Lab report uploaded successfully"));
});


//! Update test status
export const updateTestStatus = asyncHandler(async (req, res, next) => {
    const { reportId } = req.params;
    const { status } = req.body;

    if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
        throw new ApiError(400, "Valid status is required (Pending, In Progress, Completed)");
    }

    const report = await LabReport.findById(reportId);
    if (!report) throw new ApiError(404, "Lab report not found");

    report.status = status;
    report.technician = req.labTech._id;
    report.technicianName = `${req.labTech.firstName} ${req.labTech.lastName}`;
    await report.save();

    res.status(200).json(new ApiResponse(200, report, "Test status updated"));
});


//! Get all lab records (completed reports)
export const getLabRecords = asyncHandler(async (req, res, next) => {
    const reports = await LabReport.find().sort({ updatedAt: -1 });
    res.status(200).json(new ApiResponse(200, reports, "Lab records"));
});


//! Get lab dashboard stats
export const getLabDashboardStats = asyncHandler(async (req, res, next) => {
    const totalReports = await LabReport.countDocuments();
    const pending = await LabReport.countDocuments({ status: "Pending" });
    const inProgress = await LabReport.countDocuments({ status: "In Progress" });
    const completed = await LabReport.countDocuments({ status: "Completed" });

    // Count total pending test requests (appointments with lab tests that don't have reports yet)
    const appointments = await Appointment.find({
        labTests: { $exists: true, $ne: [] },
        status: "Accepted",
    });

    let pendingTests = 0;
    for (const apt of appointments) {
        for (const testName of apt.labTests) {
            const exists = await LabReport.findOne({
                appointment: apt._id,
                testName,
                status: "Completed",
            });
            if (!exists) pendingTests++;
        }
    }

    res.status(200).json(new ApiResponse(200, {
        totalReports,
        pending,
        inProgress,
        completed,
        pendingTests,
    }, "Lab dashboard stats"));
});


//! Create a pending lab report entry (so tech can claim/track it)
export const createPendingReport = asyncHandler(async (req, res, next) => {
    const techId = req.labTech._id;
    const { appointmentId, testName } = req.body;

    if (!appointmentId || !testName) {
        throw new ApiError(400, "Appointment ID and test name are required");
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new ApiError(404, "Appointment not found");

    const existing = await LabReport.findOne({ appointment: appointmentId, testName });
    if (existing) {
        throw new ApiError(400, "A report for this test already exists");
    }

    const report = await LabReport.create({
        appointment: appointment._id,
        patient: appointment.patient,
        patientFirstName: appointment.patientFirstName,
        patientLastName: appointment.patientLastName,
        doctor: appointment.doctor,
        doctorFirstName: appointment.doctorFirstName,
        doctorLastName: appointment.doctorLastName,
        testName,
        status: "In Progress",
        technician: techId,
        technicianName: `${req.labTech.firstName} ${req.labTech.lastName}`,
    });

    res.status(201).json(new ApiResponse(201, report, "Test claimed — In Progress"));
});


//! Get all lab technicians (admin)
export const getAllLabTechnicians = asyncHandler(async (req, res, next) => {
    const techs = await LabTechnician.find();
    res.status(200).json(new ApiResponse(200, techs, "All Lab Technicians"));
});
