const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')
const routes = require('./routes/index')
require('dotenv').config()
const cors = require('cors')
app.set('trust proxy', true)
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(routes)

mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log("mongodb connected successfully ");
    app.listen(process.env.PORT, () => {
        console.log("server started");
    })


}).catch((e) => {
    console.log(e);

})

