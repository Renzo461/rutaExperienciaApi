const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

module.exports = multer({storage});