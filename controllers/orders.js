const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const getAll = async (req, res) => {
  //#swagger .tags=['orders']
    const result = await mongodb.getDb().db().collection('order').find();
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
      });
  };

const getSingle = async (req, res) => {
  //#swagger .tags=['orders']
    const orderId = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('order').find({_id: orderId});
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
      });
};

const  createOrder = async(req, res) => {
  //#swagger .tags=['orderId']
    const order = {
        pickup_time: req.body.pickup_time,
        order_date: req.body.order_date,
        entree: req.body.entree,
        drink: req.body.drink,
        side: req.body.side,
        dessert: req.body.dessert,
        notes: req.body.notes

  };
  const response = await mongodb.getDb().db().collection('order').insertOne(order);
  if (response.acknowledged){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the order.');
  }
};

const  updateOrder = async(req, res) => {
  //#swagger .tags=['orders']
 // console.log('update order');
  const orderId = new objectId(req.params.id);
  const order = {
    pickup_time: req.body.pickup_time,
    order_date: req.body.order_date,
    entree: req.body.entree,
    drink: req.body.drink,
    side: req.body.side,
    dessert: req.body.dessert,
    notes: req.body.notes
  };
  const response = await mongodb.getDb().db().collection('order').replaceOne({ _id: orderId}, order);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the order.');
  }
};

const deleteOrder = async(req, res) => {
  //#swagger .tags=['order']
  //console.log('delete order');
  const orderId = new objectId(req.params.id);
  const response = await mongodb.getDb().db().collection('order').deleteOne({ _id: orderId}, true);
  if (response.deletedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the order.');
  }
};

  module.exports = { 
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};