const CartItemRequestDTO = require("../dtos/cartdto/CartItemRequestDTO");
const CartResponseDTO = require("../dtos/cartdto/CartResponseDTO");
const CartDB = require("../models/CartModel")

exports.getCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id }).populate("items.product");
   if (!cart) {
    return res.json({ user: req.user.id, items: [] });
  }
  res.json(new CartResponseDTO(cart));
};
exports.addToCart = async (req, res) => {
  const itemReq = new CartItemRequestDTO(req.body);
  let cart = await CartDB.findOne({ user: req.user.id });

  if (!cart) cart = new CartDB({ user: req.user.id, items: [] });

  const existing = cart.items.find(item => item.product.toString() === itemReq.productId);

  if (existing) {
    existing.quantity += itemReq.quantity;
  } else {
    cart.items.push({ product: itemReq.productId, quantity: itemReq.quantity });
  }

  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(new CartResponseDTO(populatedCart));
};

exports.updateCartItem = async (req, res) => {
  const itemReq = new CartItemRequestDTO(req.body);
  const cart = await CartDB.findOne({ user: req.user.id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i.product.toString() === itemReq.productId);
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = itemReq.quantity;
  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(new CartResponseDTO(populatedCart));
};

exports.removeFromCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id });

   if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(new CartResponseDTO(populatedCart));
};

exports.clearCart = async (req, res) => {
  const cart = await CartDB.findOne({ user: req.user.id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ message: "Cart cleared" });
};
