const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle file uploads
app.post('/upload', upload.array('file'), (req, res) => {
    // Send a response with JSON data (file details)
    const uploadedFiles = req.files.map(file => ({
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
    }));

    res.status(200).json(uploadedFiles);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
