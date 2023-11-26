const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger .tags=['customers']
    const result = await mongodb.getDb().db().collection('customer').find();
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
      });
  };

  // const getAll = (req, res) => {
  //   mongodb
  //     .getDb()
  //     .db()
  //     .collection('customers')
  //     .find()
  //     .toArray((err, customers) => {
  //       if (err) {
  //         res.status(400).json({ message: err });
  //       }
  //       res.setHeader('Content-Type', 'application/json');
  //       res.status(200).json(customers);
  //     });
  // };
  

const getSingle = async (req, res) => {
  //#swagger .tags=['customers']
    const customerId = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('customer').find({_id: customerId});
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
      });
};

const  createCustomer = async(req, res) => {
  //#swagger .tags=['customer']
    const customer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rewards_number: req.body.rewards_number,
      email: req.body.email,
      phone_number: req.body.phone_number,
      zip: req.body.zip,
      card_number: req.body.card_number

  };
  const response = await mongodb.getDb().db().collection('customer').insertOne(customer);
  if (response.acknowledged){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the customer.');
  }
};

const  updateCustomer = async(req, res) => {
  //#swagger .tags=['Users']
  //console.log('update customer');
  const customerId = new objectId(req.params.id);
  const customer = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    rewards_number: req.body.rewards_number,
    email: req.body.email,
    phone_number: req.body.phone_number,
    zip: req.body.zip,
    card_number: req.body.card_number
  };
  const response = await mongodb.getDb().db().collection('customer').replaceOne({ _id: customerId},customer);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the customer.');
  }
};

const deleteCustomer = async(req, res) => {
  //#swagger .tags=['customer']
  //console.log('delete customer');
  const customerId = new objectId(req.params.id);
  const response = await mongodb.getDb().db().collection('customer').deleteOne({ _id: customerId},true);
  if (response.deletedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the customer.');
  }
};

  module.exports = { 
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};