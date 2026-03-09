import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utilis/jwtToken.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Payment } from "../models/payment.model.js";

//! Register the user
export const patientRegister = asyncHandler(async (req, res, next) => {
    // taking the info from the user
    const { firstName, lastName, email, phone, address, dob, gender, password } = req.body;

    // checking the info provided by the user
    if (!firstName || !lastName || !email || !phone || !address || !dob || !gender || !password) {
        throw new ApiError(400, "Please Fill Full Form!");
    }

    // check if the user already exists
    let existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(400, `${existedUser.role} with this Email already Registered`);
    }

    // finally create the user
    const createdUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        dob,
        gender,
        password,
        role: "Patient",
    });
    generateToken(createdUser, "User Registrated Successfully!", 200, res);
    // return res.status(201).json(
    //     new ApiResponse(200, createdUser, "User registered Successfully")
    // )
});


//! Getting details for the user(patiend & admin)
export const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = req.user;

    res
        .status(200)
        .json(new ApiResponse(200, user, `${user.role} Details`));
});

//! Getting details for the doctro
export const getDoctorDetails = asyncHandler(async (req, res, next) => {
    const user = req.doctor;

    res
        .status(200)
        .json(new ApiResponse(200, user, `${user.role} Details`));
});
export const getUserAppointmentInfo = asyncHandler(async (req, res, next) => {
    const { appointmentId } = req.params;
    try {
        const pipeline = [
            {
                $match:
                {
                    _id: mongoose.Types.ObjectId(appointmentId)
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patientDetails"
                }
            },
            {
                $unwind: "$patientDetails"
            },
            {
                $lookup: {
                    from: "Doctor",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctorDetails"
                }
            },
            {
                $unwind: "$doctorDetails"
            },
            {
                $project: {
                    _id: 1,
                    appointmentDate: 1,
                    status: 1,
                    city: 1,
                    pincode: 1,
                    department: 1,
                    'patientDetails.firstName': 1,
                    'patientDetails.lastName': 1,
                    'patientDetails.email': 1,
                    'patientDetails.phone': 1,
                    'doctorDetails.firstName': 1,
                    'doctorDetails.lastName': 1,
                    'doctorDetails.email': 1,
                    'doctorDetails.phone': 1,
                    'doctorDetails.department': 1,
                    'doctorDetails.specializations': 1,
                    'doctorDetails.experience': 1
                }
            }
        ];
        const appointmentInfo = await Appointment.aggregate(pipeline);
        if (appointmentInfo.length === 0) {
            throw new ApiError(404, "Appointment not found");
        }
        res.status(200).json(new ApiResponse(200, appointmentInfo, "Appointment Details"));

    } catch {
        console.error(err);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }

});


//! Update patient profile
export const updatePatientProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { firstName, lastName, phone, address, dob, gender } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
        firstName, lastName, phone, address, dob, gender
    }, { new: true, runValidators: true });

    res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});


//! Book appointment (patient)
export const bookPatientAppointment = asyncHandler(async (req, res, next) => {
    const patient = req.user;
    const { doctorId, city, pincode, appointmentDate, department } = req.body;

    if (!doctorId || !city || !pincode || !appointmentDate || !department) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw new ApiError(404, "Doctor not found");

    const appointment = await Appointment.create({
        patient: patient._id,
        patientFirstName: patient.firstName,
        patientLastName: patient.lastName,
        doctor: doctor._id,
        doctorFirstName: doctor.firstName,
        doctorLastName: doctor.lastName,
        experience: doctor.experience,
        appointmentCharges: doctor.appointmentCharges,
        city,
        pincode,
        appointmentDate,
        department,
    });

    res.status(201).json(new ApiResponse(201, appointment, "Appointment booked successfully!"));
});


//! Get patient's appointments
export const getPatientAppointments = asyncHandler(async (req, res, next) => {
    const patientId = req.user._id;
    const appointments = await Appointment.find({ patient: patientId }).sort({ appointmentDate: -1 });
    res.status(200).json(new ApiResponse(200, appointments, "Patient appointments"));
});


//! Cancel appointment (patient)
export const cancelPatientAppointment = asyncHandler(async (req, res, next) => {
    const patientId = req.user._id;
    const { id } = req.params;

    const appointment = await Appointment.findOne({ _id: id, patient: patientId });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    if (appointment.status === "Rejected") {
        throw new ApiError(400, "Appointment is already rejected");
    }

    await appointment.deleteOne();
    res.status(200).json(new ApiResponse(200, null, "Appointment cancelled successfully"));
});


//! Get patient prescriptions (appointments with medical data)
export const getPatientPrescriptions = asyncHandler(async (req, res, next) => {
    const patientId = req.user._id;
    const appointments = await Appointment.find({
        patient: patientId,
        $or: [
            { diagnosis: { $ne: "" } },
            { prescription: { $ne: "" } },
            { medicalNotes: { $ne: "" } },
            { labTests: { $ne: [] } },
        ]
    }).sort({ appointmentDate: -1 });
    res.status(200).json(new ApiResponse(200, appointments, "Patient prescriptions"));
});


//! Get patient billing details
export const getPatientBilling = asyncHandler(async (req, res, next) => {
    const patientId = req.user._id;
    const appointments = await Appointment.find({
        patient: patientId,
        status: "Accepted"
    }).sort({ appointmentDate: -1 });

    res.status(200).json(new ApiResponse(200, appointments, "Patient billing"));
});