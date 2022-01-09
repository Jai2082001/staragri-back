const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();

router.use('/brandDisplay', (req, res, next) => {
    let db = getDb();
    console.log('brandHere')
    db.collection('brand').find({}).toArray().then((response) => {
        if (response) {
            res.send(response);
        } else {
            console.log(response)
            res.send({status: "No Brand Names"})
        }
    })
})


router.use('/brandDisplaySub', (req, res, next)=>{
    let db = getDb();
    const {subid} = req.headers; 
    db.collection('brand').find({addedby: subid}).toArray().then((response)=>{
        res.send(response)
    })
})

router.use('/brandAddSub', (req, res, next)=>{
    let db = getDb();
    const {subid, name, subname, imgFile} = req.body;
    db.collection('brand').insertOne({name: name, subName: subname, imgFile: imgFile, addedby: subid}).then((response)=>{
        console.log(response);
        res.send(response)
    })
})

router.use('/brandCycles', (req, res, next)=>{
    let db = getDb();
    db.collection('cycles').find().toArray().then((response)=>{
        let access = []
        let cycles = []
        response.map((singleItem)=>{
            if(singleItem.categories === 'Cycle'){
                if(!(cycles.includes(singleItem.brand.label))){
                    cycles.push(singleItem.brand.label)
                }
            }else{
                if(!access.includes(singleItem.brand.label)){
                    access.push(singleItem.brand.label)
                }
            }
        })       
        res.send({cycles: cycles, access: access}) 
    })
})

exports.brandName = router;




// ;router.use('/productDis', (req, res, next)=>{
//     console.log('product Dis')
//     let db = getDb()
//     db.collection('cycles').find({}).toArray().then((response)=>{
//         res.send(response)
//     })
// })

// router.get('/productDisplayLimit', (req, res, next) => {
//     let db = getDb();
//     let limitHeader = parseInt(req.headers.limit);
//     db.collection('cycles').find({}).limit(limitHeader).toArray().then((response) => {
//         res.send(response)
//     })
// })