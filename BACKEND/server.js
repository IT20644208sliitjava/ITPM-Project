const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});



const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

const moduleRouter = require("./routes/Route_module.js")
app.use("/module1",moduleRouter);

const exam = require('./routes/Route_Exam.js');
app.use('/exam', exam);

const onequestion = require('./routes/Route_one_question.js');
app.use('/oneQuestion', onequestion);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})