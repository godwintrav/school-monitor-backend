const { Router } = require('express');
const router = Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add",authMiddleware.authorize(["admin", "user"]) ,attendanceController.addAttendance);

module.exports = router;