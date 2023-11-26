const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

const customersController = require('../controllers/customers');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);
router.post('/', validate.saveCustomer, customersController.createCustomer);
router.put('/:id', validate.saveCustomer, customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;