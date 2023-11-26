const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const ordersController = require('../controllers/orders');

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getSingle);
router.post('/', validate.saveOrder, ordersController.createOrder);
router.put('/:id', validate.saveOrder, ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;