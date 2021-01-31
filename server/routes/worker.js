const express = require("express");
const WorkerController = require("../controllesr/worker");
const isAdminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/worker", WorkerController.createWorker);
router.get("/workers", WorkerController.getWorkers);
router.get("/worker/:id", isAdminMiddleware, WorkerController.getOneWorker);
router.delete("/worker/:id", isAdminMiddleware, WorkerController.deleteWorker);

module.exports = router;
