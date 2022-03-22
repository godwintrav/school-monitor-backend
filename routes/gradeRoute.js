const { Router } = require('express');
const router = Router();
const gradeController = require('../controllers/gradeController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add/:id", gradeController.addStudentGrade);
router.get("/student/:id", authMiddleware.authorize(["admin", "user"]) ,gradeController.fetchStudentGrades);
router.put("/update/:id", gradeController.updateStudentGrade);

module.exports = router;