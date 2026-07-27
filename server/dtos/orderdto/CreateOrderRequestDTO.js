class CreateOrderRequestDTO {
  constructor(body) {
    this.products = body.products || [];
    this.totalAmount = body.totalAmount ? Number(body.totalAmount) : null;
    this.shippingAddress = body.shippingAddress ? body.shippingAddress.trim() : null;
    this.paymentIntentId = body.paymentIntentId;
    this.status = body.status;
  }
}

module.exports = CreateOrderRequestDTO;
