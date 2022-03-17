const { Router } = require('express');
const router = Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add", attendanceController.addAttendance);

module.exports = router;