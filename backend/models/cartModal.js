const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  items: [
    {
      productId: String,
      productName: String,
      productPrice: Number,
      productQuantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
