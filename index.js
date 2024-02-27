const express = require('express');
const dotenv = require("dotenv");
const app = express();
const fileUpload = require('express-fileupload');
const client = require('./connectDB/connectDb');
const userRoutes = require('./routes/user.route')
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 150 * 1024 * 1024 },
}));
app.use('/user', userRoutes)

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
