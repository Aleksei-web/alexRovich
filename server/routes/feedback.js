const express = require('express')
const FeetbackController = require('../controllesr/feedback')

const router = express.Router();

router.post('/feetback', FeetbackController.createFeedback);
router.get('/feetback', FeetbackController.getFeedback);
router.get('/feetback/:id', FeetbackController.getFeedbackByWorker);


router.get('/feetback_rating', FeetbackController.getFeedbackDaysAndRartind);

router.get('/reasons_by_worker/:id', FeetbackController.getReasonsByWorker); // причины плохого комментария по работнику

router.get('/feetbacktest/:id', FeetbackController.getReasonsByWorker);

module.exports = router;