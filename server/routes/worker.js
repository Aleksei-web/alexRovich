const express = require('express')
const WorkerController = require('../controllesr/worker')

const router = express.Router();

router.post('/worker', WorkerController.createWorker)
router.get('/workers', WorkerController.getWorkers)
router.get('/worker/:id', WorkerController.getOneWorker)
router.delete('/worker/:id', WorkerController.deleteWorker)

module.exports = router;