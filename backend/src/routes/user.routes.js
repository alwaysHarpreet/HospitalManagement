import express from "express";
import { patientRegister, getUserDetails, getDoctorDetails, updatePatientProfile, bookPatientAppointment, getPatientAppointments, cancelPatientAppointment, getPatientPrescriptions, getPatientBilling } from "../controllers/user.controller.js";
import { login, logoutAdmin, logoutDoctor, logoutPatient } from "../controllers/login_logout.controller.js";
import { addNewAdmin, getAllPatients, getAllAdmins, getDashboardStats, deleteDoctor, getAllPayments, getAllMedicines } from "../controllers/admin.controller.js";
import { addNewDoctor, getAllDoctors, getMyAppointments, getMyPatients, getPatientRecord, addDiagnosis, writePrescription, uploadMedicalNotes, recommendLabTests, updateTreatmentStatus, getDoctorDashboardStats } from "../controllers/doctor.controller.js";
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from "../controllers/appointment.controller.js";
import { getAllMessages } from "../controllers/contactus.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, upload.single("docAvatar"), addNewDoctor);
router.get("/alldoctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getDoctorDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/doctor/logout", isDoctorAuthenticated, logoutDoctor);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

// Patient portal routes
router.put("/patient/update-profile", isPatientAuthenticated, updatePatientProfile);
router.post("/patient/book-appointment", isPatientAuthenticated, bookPatientAppointment);
router.get("/patient/my-appointments", isPatientAuthenticated, getPatientAppointments);
router.delete("/patient/cancel-appointment/:id", isPatientAuthenticated, cancelPatientAppointment);
router.get("/patient/my-prescriptions", isPatientAuthenticated, getPatientPrescriptions);
router.get("/patient/my-billing", isPatientAuthenticated, getPatientBilling);

// Admin dashboard routes
router.get("/admin/dashboard-stats", isAdminAuthenticated, getDashboardStats);
router.get("/admin/all-patients", isAdminAuthenticated, getAllPatients);
router.get("/admin/all-admins", isAdminAuthenticated, getAllAdmins);
router.get("/admin/all-appointments", isAdminAuthenticated, getAllAppointments);
router.put("/admin/appointment/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/admin/appointment/delete/:id", isAdminAuthenticated, deleteAppointment);
router.delete("/admin/doctor/delete/:id", isAdminAuthenticated, deleteDoctor);
router.get("/admin/all-payments", isAdminAuthenticated, getAllPayments);
router.get("/admin/all-medicines", isAdminAuthenticated, getAllMedicines);
router.get("/admin/all-messages", isAdminAuthenticated, getAllMessages);

// Doctor portal routes
router.get("/doctor/dashboard-stats", isDoctorAuthenticated, getDoctorDashboardStats);
router.get("/doctor/my-appointments", isDoctorAuthenticated, getMyAppointments);
router.get("/doctor/my-patients", isDoctorAuthenticated, getMyPatients);
router.get("/doctor/patient/:patientId", isDoctorAuthenticated, getPatientRecord);
router.put("/doctor/appointment/:id/diagnosis", isDoctorAuthenticated, addDiagnosis);
router.put("/doctor/appointment/:id/prescription", isDoctorAuthenticated, writePrescription);
router.put("/doctor/appointment/:id/medical-notes", isDoctorAuthenticated, uploadMedicalNotes);
router.put("/doctor/appointment/:id/lab-tests", isDoctorAuthenticated, recommendLabTests);
router.put("/doctor/appointment/:id/treatment-status", isDoctorAuthenticated, updateTreatmentStatus);
router.put("/doctor/appointment/:id/status", isDoctorAuthenticated, updateAppointmentStatus);

export default router;