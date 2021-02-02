const express = require("express");
const AdminController = require("../controllesr/admin");
const isAdminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router();
// причины
router.post("/reason", isAdminMiddleware, AdminController.createrReason);
router.get("/reasons", AdminController.getReason);
router.get("/reason/:id",  AdminController.getOneReason);
router.put("/reason", isAdminMiddleware, AdminController.updateReason);
router.delete("/reason/:id", isAdminMiddleware, AdminController.deleteReason);

module.exports = router;
