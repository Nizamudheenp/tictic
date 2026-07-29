const { z } = require('zod');

const createPaymentIntentSchema = z.object({
  amount: z.coerce.number().positive('Payment amount must be a positive number'),
});

module.exports = {
  createPaymentIntentSchema,
};
