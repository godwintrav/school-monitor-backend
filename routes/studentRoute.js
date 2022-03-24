const { Router } = require('express');
const router = Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authenticationMiddleware');
const multer = require('multer');

const uploadImg = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/))
        return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
});

router.post("/register", uploadImg.single('image'), studentController.register, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({errors: err.message});
});
router.post("/login", studentController.login);
router.get("/all", authMiddleware.authorize(["admin", "user"]) ,studentController.fetchAllStudents);
router.get("/:id", authMiddleware.authorize(["admin", "user"]) ,studentController.fetchStudent);
router.get("/image/:id" ,studentController.fetchStudentImage);
router.post("/password/:id", authMiddleware.authorize(["admin", "user"]), studentController.updatePassword);

module.exports = router;