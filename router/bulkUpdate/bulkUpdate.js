const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb

router.use('/addBulkCycleProduct',  (req, res, next)=>{ 
    let db = getDb();
    console.log(req.body)
    // db.collection()
    const array = req.body;
    let slicedArray = []
    for(let i=0;i<array.length;i++){
        if(i!==0){
            slicedArray.push(array[i])
        }
    }   

    for(let j =0 ; j<array.length ; j++){
        ((j)=>{
            db.collection('cycles').insertOne({name: array[j][0], price: array[j][1], overprice: array[j][2] })

        })(j)
    }
    console.log('ehere')
    res.send({status: 'foo'})
})

exports.bulkUpdate = router