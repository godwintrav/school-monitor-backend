const { Router } = require('express');
const router = Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.get("/all", authMiddleware.authorize(["admin", "user"]) ,studentController.fetchAllStudents);
router.get("/:id", authMiddleware.authorize(["admin", "user"]) ,studentController.fetchStudent);

module.exports = router;