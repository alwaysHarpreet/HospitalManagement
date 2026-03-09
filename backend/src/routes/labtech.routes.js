import express from "express";
import { isAdminAuthenticated, isLabTechAuthenticated } from "../middlewares/auth.middleware.js";
import { logoutLabTech } from "../controllers/login_logout.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    addLabTechnician,
    getLabTechDetails,
    getTestRequests,
    uploadLabReport,
    updateTestStatus,
    getLabRecords,
    getLabDashboardStats,
    createPendingReport,
    getAllLabTechnicians,
} from "../controllers/labtech.controller.js";

const router = express.Router();

// Admin routes
router.post("/add", isAdminAuthenticated, addLabTechnician);
router.get("/all", isAdminAuthenticated, getAllLabTechnicians);

// Lab tech auth
router.get("/me", isLabTechAuthenticated, getLabTechDetails);
router.get("/logout", isLabTechAuthenticated, logoutLabTech);

// Lab tech operations
router.get("/dashboard-stats", isLabTechAuthenticated, getLabDashboardStats);
router.get("/test-requests", isLabTechAuthenticated, getTestRequests);
router.post("/upload-report", isLabTechAuthenticated, upload.single("reportFile"), uploadLabReport);
router.put("/update-status/:reportId", isLabTechAuthenticated, updateTestStatus);
router.get("/records", isLabTechAuthenticated, getLabRecords);
router.post("/claim-test", isLabTechAuthenticated, createPendingReport);

export default router;
