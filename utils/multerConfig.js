import multer from "multer";
import path from "path";
import crypto from "crypto";
// diskstorage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images/uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    crypto.randomBytes(12, function (err, name) {
      const fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    });
  },
});

const upload = multer({ storage: storage });

// export upload variable

export default upload