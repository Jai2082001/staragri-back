const express = require('express');
const db = require('../../database/database').getDb;
const router = express.Router();

router.use('/imgDisplay', (req, res, next)=>{
    let db = getDb();
    db.collection('images').find({}).toArrayA().then((response)=>{
        res.send(response)
    })
})

router.use('/imgAdd', (req, res, next)=>{
    let db = getDb();
    let {imageLocation} = req.headers
    console.log(imageLocation)
    db.collection('image').find({})
})

exports.image = router