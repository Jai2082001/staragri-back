const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();


router.use('/removeBrandName', (req, res, next) => {
    let db = getDb();
    let { name, subname } = req.headers;
    console.log('removebrandhere');
    console.log(name);
    console.log(subname);
    db.collection('brand').deleteOne({ name: name, subName: subname}).then((response) => {
        console.log(response)
        res.send(response);
    })
})

exports.removeBrand = router;
