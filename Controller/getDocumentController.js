const express = require("express");
const router = express.Router();

const documetSerice = require("../Service/getDocumentService");

router.get("/" , async (req , res) => {
    try{
        let result = await documetSerice.getList();
        res.send(result);
    }catch(e){
        res.send(e.message);
    }
});

router.post("/save" , async (req , res) => {
    try{
        let result = await documetSerice.saveDocument(req.body);
        res.send(result);
    }catch(e){
        res.send(e.message);
    }
})



module.exports = router;

