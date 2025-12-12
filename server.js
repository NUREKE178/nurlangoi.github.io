// Simple Node.js/Express upload example
// Usage:
// 1. npm install
// 2. node server.js
// Sends uploaded files to /uploads and provides JSON response

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'ibilim2025';
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });
const app = express();
app.use(cors());
app.use(express.static(__dirname)); // serve gallery and uploads

app.post('/upload', upload.single('image'), (req, res) => {
  const pwd = req.body.password || req.headers['x-upload-password'];
  if (pwd !== UPLOAD_PASSWORD) {
    // remove uploaded file if any
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(403).json({ok:false, message:'Invalid password'});
  }

  if (!req.file) return res.status(400).json({ok:false, message:'No file uploaded'});

  const url = '/uploads/' + path.basename(req.file.path);
  return res.json({ok:true, filename: req.file.filename, url});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Upload server listening on http://localhost:${PORT}`));
