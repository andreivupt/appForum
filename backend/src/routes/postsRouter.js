const { Router } = require('express');
const router = Router();
const multer = require("multer");
const { listPosts, storePost } = require('../controllers/postsController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

var upload = multer({ storage });

router.get('/posts', listPosts);
router.post('/post/create', upload.single('file'), storePost);

module.exports = router;

