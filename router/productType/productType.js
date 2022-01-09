const getDb = require('../../database/database').getDb;
const express = require('express');
const router = express.Router()

router.use('/addProductType', (req, res, next)=>{
    let db = getDb();
    const {name} = req.headers;
    db.collection('productType').insertOne({name: name}).then((response)=>{
        console.log(response)
        res.send(response)
    })
})

router.use('/displayProductType', (req,res, next)=>{
    let db = getDb();
    db.collection('productType').find({}).toArray().then((response)=>{
        res.send(response)
    })  
})


exports.productType = router