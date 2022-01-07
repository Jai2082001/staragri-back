const express = require('express');
const router = express.Router();
const getDb = require('../database/database').getDb;
const { ObjectId } = require('mongodb');

router.use('/addProduct', (req, res, next) => {
    let db = getDb();

    let { categories } = req.body;
    let {addedby} = req.headers; 

    if (categories === 'Cycle') {
        const { name, brand, emi, overprice, price, tire, frame, category, coupon, userType, gear, weight, brake, images, displayimages, stock, front, rear, suspension, quantity, categories , dateadded, desc} = req.body;

        db.collection('cycles').find({ name: name }).toArray().then((response) => {
            if (response.length) {
                res.send({status: 'error'})
            } else {
                db.collection('cycles').insertOne({ dateadded: dateadded, name: name, price: price, userType: userType, category: category, desc: desc, coupon: coupon, overprice: overprice, emi: emi, brand: brand, "no. of gears": gear, weight: weight, "frame material": frame, brakes: brake, images: images, displayimages: displayimages, stock: stock, "front deraileur": front, "rear deraileur": rear, "suspension": suspension, "wheel size": tire, quantity: quantity, categories: categories, addedby: addedby }).then((response) => {
                    res.send({status: undefined})
                })
            }
        })
        }
        else {
        let {name} = req.body  
        console.log(name)
        db.collection('cycles').find({ name: name }).toArray().then((response) => {
            if (response.length) {
                res.send({status: 'error'})    
            } else {
                const { name, price, coupon, riderType, descPoint1, descPoint2, descPoint3, descPoint4, brand, desc, emi, overprice, images, displayimages, dateAdded, stock, quantity, forProduct, categories, cycleType } = req.body;
            
                db.collection('cycles').insertOne({ name: name, price: price, coupon: coupon, riderType: riderType, cycleType: cycleType, descPoint1: descPoint1, descPoint2: descPoint2, descPoint3: descPoint3, dateAdded: dateAdded, stock: stock, forProduct: forProduct, overprice: overprice, images: images, displayimages: displayimages, quantity: quantity, categories: categories, descPoint3: descPoint3, desc: desc, descPoint4: descPoint4, emi: emi, brand: brand, addedby: addedby }).then((response) => {
                    res.send({status: undefined})
                })
            
            }    
        })
    }
})

router.use('/updateProduct', (req, res, next) => {
    let db = getDb();
    const { id } = req.body;
    const { name, price, type, category, desc, coupon, overprice, emi, brand, stock, quantity, gear, front, rear, weight, wheel, suspension } = req.body;
    db.collection('cycles').find({ _id: ObjectId(id) }).toArray().then((response) => {
        if (response.length > 0) {
            db.collection('cycles').updateOne({ _id: id }, {
                $set: {
                    name: name,
                    price: price,
                    type: type,
                    category: category,
                    desc: desc,
                    coupon: coupon,
                    overprice: overprice,
                    emi: emi,
                    brand: brand,
                    stock: stock
                }
            }).then((response) => {
                if (response) {
                    res.send(response);
                } else {
                    res.send({status: 'Some Error Has Occured'})
                }
            })
        } else {
            res.send({status: 'Not in the Database'})
        }
    })
    
})

    exports.addProduct = router;
