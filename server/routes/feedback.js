const express = require("express");
const FeetbackController = require("../controllesr/feedback");
const isAdminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/feetback", FeetbackController.createFeedback);
router.get("/feetback", isAdminMiddleware, FeetbackController.getFeedback);
router.get("/feetback/:id", isAdminMiddleware, FeetbackController.getFeedbackByWorker);

router.get("/feetback_rating", isAdminMiddleware, FeetbackController.getFeedbackDaysAndRartind);

router.get("/feetback_by_rating/:id", isAdminMiddleware, FeetbackController.getFeedbackByReasons); // отправляем массив опросов по id причины

router.get("/reasons_by_worker/:id", isAdminMiddleware, FeetbackController.getReasonsByWorker); // причины плохого комментария по работнику

// router.get("/feetbacktest/:id", isAdminMiddleware, FeetbackController.getReasonsByWorker);

router.get("/feetbacktest", FeetbackController.getFeedbackTest);

module.exports = router;
