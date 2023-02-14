const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false);

const username = process.env.DB_USER
const password = process.env.DB_PASS


const url = `mongodb+srv://${username}:${password}@cluster01.rvhjwez.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    });
