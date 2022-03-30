const { Router } = require('express');
const router = Router();
const teacherController = require('../controllers/teacherController');
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

router.post("/add", uploadImg.single('image'), teacherController.createTeacher, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({errors: err.message});
});
router.get("/" ,teacherController.fetchTeachers);
router.get("/image/:id" , teacherController.fetchTeacherImage);

module.exports = router;