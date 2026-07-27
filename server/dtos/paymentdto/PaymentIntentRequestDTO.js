class PaymentIntentRequestDTO {
  constructor(body) {
    this.amount = body.amount ? Number(body.amount) : 0;
  }
}

module.exports = PaymentIntentRequestDTO;
