const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const { ObjectId } = require('mongodb');


router.use('/orderIssue', (req, res, next) => {
    let db = getDb();
    console.log(req.body)
    const { user, address } = req.body;
    console.log(user);
    db.collection('orders').insertOne({ userid: user._id, name: user.name, email: user.email, number: user.number, cart: user.cart, address: address }).then((response) => {
        db.collection('users').updateOne({ _id: new ObjectId(user._id) }, {
            $set: {
                cart: []
            }
        }).then((response) => {
            console.log(response)
            res.send(response)        
        })
    })
})

router.use('/orderReceived', (req, res, next) =>
{
    console.log('hitting here')
    let db = getDb();
    db.collection('orders').find().sort({ _id: -1 }).toArray().then((response) => {
        console.log(response)
        res.send(response)
    })
})

router.use('/orderAccept', async (req, res, next) => {
    let { cart, _id } = req.body;
    console.log(req.body)
    let db = getDb();
    let flag = 0;
    for (let i = 0; i < cart.length;i++){
        (function (i) {
            db.collection('cycles').findOne({ _id: new ObjectId(cart[i].product._id) }).then((response) => {
                let quant = parseInt(response.quantity);
                if (quant > cart[i].quantity) {
                let quan;
                db.collection('cycles').findOne({ _id: new ObjectId(cart[i].product._id) }).then((response) => {
                    quan = parseInt(response.quantity);
                    quan = quan - cart[i].quantity;
                    db.collection('cycles').updateOne({ _id: new ObjectId(response._id) }, {
                    $set: {
                        quantity: quan.toString()
                    }
                    }).then((response) => {
                    })
                }) 
                } else if (quant === cart[i].quantity) {
                    db.collection('cycles').findOne({ _id: new ObjectId(cart[i].product._id) }).then((response) => {
                        let quan = parseInt(response.quantity);
                        quan = quan - cart[i].quantity;
                        db.collection('cycles').updateOne({ _id: new ObjectId(response._id) }, {
                        $set: {
                            quantity: quan.toString(),
                            stock: false
                        }
                        }).then((response) => {
                        })
                    })
                
            } else {
                    flag++
                    console.log('foo')
            }
            })    
        })(i)
    }

    if (flag) {
        res.send({ message: 'Some Stock is not available', status: 'error' })
    } else {
        db.collection('orders').deleteOne({ _id: new ObjectId(_id) }).then((response)=>{
            res.send({message: 'Order Accepted', status: 'ok'})
        }) 
    }
})

exports.order = router