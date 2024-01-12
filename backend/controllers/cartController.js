const Cart = require('../models/cartModal');
const Product = require("../models/productModel");

const stripe = require('stripe')('sk_test_51NzKdyBBEhPDjSj8L3dcP57c7Ho4oAe0WoUuWQG5qKuWKZukc8r8Gf1Yo7RjnPAl4mvpKcfw1oMcdyVW37ReTFdD00UqleFNSu');

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, userName, productId, productName, productPrice, productQuantity } = req.body;

    // Fetch the product information, including the stock quantity
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Check if the product is already in the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        userName,
        items: [],
      });
    }

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      // If the item is already in the cart, check if adding the requested quantity exceeds the stock
      const totalQuantity = existingItem.productQuantity + productQuantity;

      if (totalQuantity <= product.stock) {
        existingItem.productQuantity = totalQuantity;
      } else {
        return res.status(400).json({ success: false, error: 'Exceeds available stock' });
      }
    } else {
      // If the item is not in the cart, check if the requested quantity is within the stock
      if (productQuantity <= product.stock) {
        cart.items.push({
          productId,
          productName,
          productPrice,
          productQuantity,
        });
      } else {
        return res.status(400).json({ success: false, error: 'Exceeds available stock' });
      }
    }

    await cart.save();

    return res.status(200).json({ success: true, message: 'Item added to cart successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



exports.getProductsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const products = cart.items; // Assuming your items array contains product details

    // Calculate the total amount of products in the cart
    const totalAmount = calculateTotalAmount(products);

    return res.status(200).json({ success: true, products, totalAmount });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Helper function to calculate the total amount
function calculateTotalAmount(items) {
  const totalAmount = items.reduce((total, item) => {
    return total + item.productPrice * item.productQuantity;
  }, 0);

  return totalAmount;
}


exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { operation } = req.body; // Operation can be 'increment' or 'decrement'

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Find the product in the cart
    const productIndex = cart.items.findIndex(item => item.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, error: 'Product not found in the cart' });
    }

    const product = cart.items[productIndex];
    
    // Check the product's stock from your database
    const productStock = await Product.findById(productId).select('stock');
    
    if (!productStock) {
      return res.status(404).json({ success: false, error: 'Product not found in the database' });
    }

    if (operation === 'increment') {
      if (product.productQuantity < productStock.stock) {
        product.productQuantity++;
      } else {
        return res.status(400).json({ success: false, error: 'Product stock exceeded' });
      }
    } else if (operation === 'decrement') {
      if (product.productQuantity > 1) {
        product.productQuantity--;
      } else {
        return res.status(400).json({ success: false, error: 'Quantity cannot be less than 1' });
      }
    } else {
      return res.status(400).json({ success: false, error: 'Invalid operation' });
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, message: 'Product quantity updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Add a new route to delete a product from the cart
exports.deleteProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Find the product in the cart
    const productIndex = cart.items.findIndex(item => item.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, error: 'Product not found in the cart' });
    }

    // Remove the product from the cart
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, message: 'Product removed from the cart' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};







////////////////////////


// Calculate the total amount of products in the cart
exports.processPayment = async (req, res) => {
 
  try {

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount:1234567,
      currency: "aud",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Helper function to calculate the total amount

// hello


