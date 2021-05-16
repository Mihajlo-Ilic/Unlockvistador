const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, '../client/pictures/');
    },
    filename: function(_req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error("Format is not correct"), false);
    }
};

const upload = multer({storage,
    fileFilter: fileFilter
});

module.exports = upload;
