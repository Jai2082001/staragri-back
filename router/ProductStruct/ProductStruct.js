const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const {ObjectId} = require('mongodb');


router.use('/productStruct', (req, res, next)=>{
    console.log("product structure")
    let db = getDb();
    let {productType, category} = req.body;
    let length = category.length;
    let index = 0;
    category.map((singleItem)=>{
        db.collection('category').find({name: singleItem.name, parentName: productType}).toArray().then((response)=>{
            if(response.length > 0){
                res.send({status: 'Already a product category combinationn'})
            }else{
                db.collection('category').insertOne({parentName: productType, name: singleItem.name, img: singleItem.img, addedby: 'admin', filterArray: singleItem.filterArray}).then((response)=>{
                    index++
                    if(index === category.length){
                        res.send({status: "done"})
                    }
                })
            }
        })        
        })
})


router.use('/filterDesc', (req, res, next)=>{
    console.log("Filter Description");
    let db = getDb();
    let {stocktype, filtervalue} = req.headers;
    console.log(req.headers)
    db.collection('category').findOne({name: filtervalue, parentName: stocktype}).then((response)=>{

        console.log(response)
        res.send({array: response.filterArray})
    })

})


exports.productStruct = router
