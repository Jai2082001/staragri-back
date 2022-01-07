const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

router.use('/cartAssociation', (req, res, next) => {
    console.log('here')
    const { carts, userid, quantity } = req.body;
    let db = getDb()
    console.log(carts)

    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        let product;
        let flag = 0;
        if (response.cart) {        
            for (let i = 0; i < response.cart.length; i++) {
                if (flag > 0) {
                    break;
                }
                    console.log(response.cart[i].product._id)
                    console.log(carts._id)
                if (response.cart[i].product._id === carts._id) {
                    flag++
                    console.log('herekkkkk')
                    product = { product: response.cart[i].product, quantity: response.cart[i].quantity + quantity }
                    const updateObj = { $set: {} };
                    updateObj.$set['cart.'+i] = product
                    db.collection('users').updateOne({ _id: new ObjectId(userid) }, updateObj).then((response) => {
                        console.log(response);
                        res.send({ status: 'done'})
                    })
                } 
            }    

            if (flag === 0) {
                console.log('hbakdjaodnaodnio')
                db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                    $push: {
                        cart: {product: carts, quantity: quantity}
                    }
                }).then((response) => {
                    console.log(response)
                    res.send({status: 'done'})
                })
            }
            else {
                db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                    $push: {
                        cart: {product: carts, quantity: quantity}
                    }
                }).then((response) => {
                    console.log(response)
                    res.send({status: 'done'})
                })
            }    
        }   
    })
})
// router.use('/cartDelete', (req, res, next) => {
//     db.collection('users')
// })
exports.cart = router