const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a Price"],
    maxLength: [8, "Price cannot be exceed more the 8 digits"],
  },

  image: {
    data: Buffer, // Store image data as a buffer
    contentType: String, // Store content type (e.g., 'image/jpeg', 'image/png')
  },
  category: {
    type: String,
    required: [true, "Please enter a product category"],
  },
  stock: {
    type: Number,
    required: true,
    maxLength: [4, "Stock Cannot Exceed More"],
    default: 1,
  },
  userId: String, // assuming userId is a string
  userName: String,
});

module.exports = mongoose.model("Product", productSchema);
