const { Router } = require('express');
const router = Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add", teacherController.createTeacher);
router.get("/", teacherController.fetchTeachers);

module.exports = router;