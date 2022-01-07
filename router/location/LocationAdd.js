const express = require('express');
const { getDb } = require('../../database/database');
const router = express.Router();

router.use('/locationAdd', (req, res, next) => {
    let db = getDb();
    const { circle, district, division, pincode, addedby } = req.headers;
    console.log('here')
    db.collection('location').insertOne({ addedby: addedby, circle: circle, district: district, division: division, pincode: pincode }).then((response) => {
        console.log(response);
        if (response) {
            res.send({status: 'suc', message: 'Location is inserted'})
        } else {
            res.send({status: 'error', message: 'Some error has occured'})
        }
    })
})


router.use('/pincodeCheck', (req, res, next) => {
    console.log('here')
    const { pincode } = req.headers;
    let db = getDb();
    db.collection('location').find({ pincode: pincode }).toArray().then((response) => {
        console.log(response)
        if (response.length > 0) {
            console.log(response)
            res.send({status: 'suc', message: 'This location is Available'});
        } else {
            res.send({status: 'error', message: 'This location is not deliverable make sure you are putting right pincode'})
        }
    })
})

exports.locationRouter = router