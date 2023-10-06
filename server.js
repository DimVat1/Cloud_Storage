const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

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

// Serve the static HTML/CSS/JS files
app.use(express.static('public'));

// Handle file uploads
app.post('/upload', upload.array('file'), (req, res) => {
    res.status(200).send('File uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
