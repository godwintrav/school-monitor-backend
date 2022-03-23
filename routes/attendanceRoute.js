const { Router } = require('express');
const router = Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add",attendanceController.addAttendance);
router.get("/:id", authMiddleware.authorize(["admin", "user"]), attendanceController.fetchStudentAttendance);

module.exports = router;