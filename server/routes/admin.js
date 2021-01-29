const express = require('express')
const AdminController = require('../controllesr/admin');
const isAdminMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
 // причины
router.post('/reason', AdminController.createrReason)
router.get('/reasons', isAdminMiddleware, AdminController.getReason)
router.get('/reason/:id',  AdminController.getOneReason)
router.put('/reason',  AdminController.updateReason)
router.delete('/reason/:id', AdminController.deleteReason)


module.exports = router;