const { Router } = require('express');
const router = Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authenticationMiddleware');

router.post("/add", eventController.createEvent);
router.get("/", eventController.fetchEvents);
router.put("/:id", eventController.updateStudentEvent);

module.exports = router;