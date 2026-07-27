class PaymentIntentResponseDTO {
  constructor(paymentIntent) {
    this.clientSecret = paymentIntent.client_secret;
  }
}

module.exports = PaymentIntentResponseDTO;
