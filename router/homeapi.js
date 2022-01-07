const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.use('/homeApi', (req, res) => {
    const cookie = req.cookies['jwt'];
    console.log('hi');
    console.log(cookie)
    const claims = jwt.verify(cookie, 'my secret key');
    res.send({message: claims})
})

exports.homeApi = router