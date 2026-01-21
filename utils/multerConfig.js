import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/uploads"));
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);

      const filename =
        name.toString("hex") + path.extname(file.originalname);

      cb(null, filename);
    });
  },
});

const upload = multer({ storage });

export default upload;
