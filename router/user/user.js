const express = require('express');
const router = express.Router();
const { getDb } = require('../../database/database')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

router.use('/registerUserSignUp', (req, res, next) => {
    console.log('hello')
    let db = getDb();
    const {name, email, number, password} = req.headers
    db.collection('users').insertOne({ name: name, email: email, number: number, password: password }).then((response) => {
        res.send({status: 'insertedUser'})
    })
})

router.use('/loginUser', (req, res, next) => {
    console.log('loginUser')
    let db = getDb();
    const { email, password } = req.headers;
    console.log(email, password)
    db.collection('users').findOne({ email: email, password: password }).then((response) => {
        console.log(response)
        if (response) {
            console.log(response)
            const token = response._id
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.send(response)
        } else {
            res.send({message: 'no authentication'})
        }
    })
})

router.use('/userAuthenticated', (req, res, next) => {
    console.log('userAuthenticated');
    const cookie = req.cookies['jwt'];
    console.log(cookie)
    let db = getDb();
    const myId = new ObjectId(cookie);
    db.collection('users').findOne({ _id: myId }).then((response) => {
        console.log(response)
        if (response) {
         res.send(response);        
        } else {
            res.send({status: 'not logged in'})
        }
    })
})

router.use('/addUserAddress', (req, res, next) => {
    console.log('user')
    const cookie = req.cookies['jwt'];
    if (!cookie) {
        return res.send({status: 'not logged in'})      
    }    
    let db = getDb();
    const { fullname, city, number, state, address, alternatenum, pincode } = req.headers;
    db.collection('address').insertOne({ fullname: fullname, number: number, state: state, address: address, alternatenum: alternatenum, pincode: pincode, city: city }).then((response) => {
        db.collection('users').updateOne({ _id: new ObjectId(cookie) }, {
        $push: {
            address: response.insertedId 
        }
        }).then((response) => {
            console.log(response)
            res.send(response)
        })
    })
})

exports.registerUser = router