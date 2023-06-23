const Order = require("../models/order");

exports.addOrder = (req, res) => {

    const client = {
        userId: req.body.client.userId ? req.body.client.userId : null,
        name: req.body.client.name,
        email: req.body.client.email,
        address: req.body.client.address
    };

    const order = new Order({
        client: client,
        shop: req.body.shop,
        order: req.body.order,
        comment: req.body.comment ? req.body.comment : null,
        date: req.body.date,
        totalPrice: req.body.totalPrice
    });

    order.save().then( createdOrder => {
        res.status(201).json({
            message:"Order added succesfully",
            data: createdOrder
        });
    })
    .catch(error => {
        res.status(500).json({
            message: error
        })
    });
}