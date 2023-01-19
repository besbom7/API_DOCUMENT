require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended : true , limit : "100MB"}));
app.use(express.json({limit : "100MB"}));
app.use(express.static('public'))


//cors origin 
app.use(cors({
    origin: "*"
}));

const DocumentController = require("./Controller/getDocumentController");

app.use('/document' , DocumentController);

app.get("/" , (req,res) => {
    res.send("Hello")
})

app.listen(5000 , async () => {
    console.log("run success");
})  