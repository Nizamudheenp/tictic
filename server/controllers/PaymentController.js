const Stripe = require('stripe');
const PaymentIntentRequestDTO = require('../dtos/paymentdto/PaymentIntentRequestDTO');
const PaymentIntentResponseDTO = require('../dtos/paymentdto/PaymentIntentResponseDTO');
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const paymentReq = new PaymentIntentRequestDTO(req.body);

    //  PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentReq.amount * 100), 
      currency: 'inr', 
      automatic_payment_methods: { enabled: true }, 
    });

    res.json(new PaymentIntentResponseDTO(paymentIntent));
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
