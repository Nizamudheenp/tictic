const express = require('express');
const { verifyToken, verifyAdmin, verifyOptionalToken } = require('../middleware/AuthMiddleware.js');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/OrderController');

const { createPaymentIntent } = require('../controllers/PaymentController.js');
const { contactEmail } = require('../controllers/MessageController.js');
const validate = require('../middleware/validate');
const { createOrderSchema, updateOrderStatusSchema } = require('../validators/orderValidator');
const { createPaymentIntentSchema } = require('../validators/paymentValidator');
const { contactMessageSchema } = require('../validators/messageValidator');
const router = express.Router();

router.post('/createorder', verifyOptionalToken, validate(createOrderSchema), createOrder);
router.get('/getuserorders', verifyToken, getUserOrders);
router.get('/getAllOrders', verifyToken, verifyAdmin, getAllOrders);
router.post('/create-payment-intent', validate(createPaymentIntentSchema), createPaymentIntent);
router.put('/updateorderstatus/:id', verifyToken, verifyAdmin, validate(updateOrderStatusSchema), updateOrderStatus);


router.post('/contact', verifyToken, validate(contactMessageSchema), contactEmail);

module.exports = router;
