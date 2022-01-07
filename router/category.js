const express = require('express');
const router = express.Router();
const getDb = require('../database/database').getDb;


router.use('/categoryAdd', (req, res, next) => {
    let db = getDb();
    let {name, img} = req.body;
    let {addedby} = req.headers
    console.log('here at category add')
    db.collection('category').find({ name: name }).toArray().then((response) => {
        if (response.length>0) {
            res.send({status: 'Already In Database'})
        } else {
            console.log('foo')
            db.collection('category').insertOne({ name: name , img: img, addedby: addedby}).then((response) => {
                res.send(response);
        })    
        }
    })
})



router.use('/categoryDisplaySub', (req, res, next)=>{
    let db = getDb();
    let {addedby} = req.headers;
    db.collection('category').find({addedby}).toArray().then((response)=>{
        res.send(response);
    })
})

router.use('/categoryAddSub', (req, res, next)=>{
    let db = getDb();
    let {name, img} = req.body;
    let {addedby} = req.headers;
    db.collection('category').insertOne({name: name, img: img, addedby: addedby}).then((response)=>{
        res.send(response)
    })
})

router.use('/categoryDisplay', (req, res, next) => {
    let db = getDb();
    console.log('categoryHere')
    db.collection('category').find().toArray().then((response) => {
        console.log(response)
        res.send(response)  
    })
})

exports.categoryAdd = router