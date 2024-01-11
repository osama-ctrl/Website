const stripe = require('stripe')('sk_test_51NzKdyBBEhPDjSj8L3dcP57c7Ho4oAe0WoUuWQG5qKuWKZukc8r8Gf1Yo7RjnPAl4mvpKcfw1oMcdyVW37ReTFdD00UqleFNSu');

exports.payment = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(req.body)
    
    const charge = await stripe.charges.create({
      amount: 1000, // Amount in cents
      currency: 'usd',
      description: 'Sample Charge',
      source: token._id,
    });

    // You can save charge details in your database for future reference

    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
