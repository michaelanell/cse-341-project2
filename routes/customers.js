const express = require('express');
const router = express.Router();
//const validate = require('../middleware/validate');
const customersController = require('../controllers/customers');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);
router.post('/', isAuthenticated, customersController.createCustomer);
router.put('/:id', isAuthenticated, customersController.updateCustomer);
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;