require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = () => {
    try {
        app.listen(6000, () => console.log(`PORT - ${PORT}` ))
    } catch (error) {
        console.log(error);
    }
}
start();