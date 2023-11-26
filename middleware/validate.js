const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {
  const validationRule = {
    first_name: 'required|string',
    last_name: 'required|string',
    email: 'required|email',
    rewards_number: 'required',
    phone_number: 'required|string',
    zip: 'string',
    card_number: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveOrder = (req, res, next) => {
    const validationRule = {
      pickup_time: 'required|string',
      order_date: 'required|string',
      entree: 'string',
      drink: 'string',
      side: 'string',
      dessert: 'string',
      notes: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
    saveCustomer,
    saveOrder
};