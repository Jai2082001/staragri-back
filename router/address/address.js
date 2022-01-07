const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const { ObjectId } = require('mongodb');

router.use('/addressDisplay', (req, res, next) => {
    if (req.headers.address) {
        const id = new ObjectId(req.headers.address);
        let db = getDb();
        console.log(id)
        db.collection('address').findOne({ _id: id }).then((response) => {
        console.log('hi')
        console.log(response)
        if (response) {
            res.send(response)            
        } else {
            res.send({ status: 'Not Available' })
        }

        })    
    } else {
        res.send({status: "Not available"})
    }
        
})

exports.address = router