const multer = require("multer");

const storage = multer.memoryStorage(); // Define storage options as needed
const upload = multer({ storage: storage });

module.exports = upload;
