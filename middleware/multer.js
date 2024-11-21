const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  let mimetype = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "application/pdf",
    "image/webp",
  ];
  if (mimetype.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file formate" }, false);
  }
};

const multerUpload = multer({
  storage,

  fileFilter,
});

module.exports = multerUpload;
