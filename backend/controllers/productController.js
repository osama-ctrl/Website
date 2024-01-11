const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwttoken");
const ApiFeature = require("../utils/apifeatures");

// Create Products ---Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const {  userId,userName, name, description, price, category, stock } = req.body;
  console.log(req.body);

  const image = req.file.buffer; // Get the uploaded image buffer
  const contentType = req.file.mimetype; // Get the content type (e.g., 'image/jpeg')

  const product = await Product.create({
    
    name,
    description,
    price,
    category,
    stock,

    image: { data: image, contentType: contentType },
    userId,
    userName, // Set the image field with data and contentType
  });

  return res.status(201).json({
    success: true,
    product,
  });
});


// exports.getAllProducts = catchAsyncError(async (req, res) => {
//   const itemsPerPage = 6; // Number of products to display per page
//   const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter

//   // Create a new instance of ApiFeature with pagination
//   const apiFeatures = new ApiFeature(Product.find(), req.query)
//       .search()
//       .filter()
//       .pagination(itemsPerPage);

//   // Execute the query
//   const products = await apiFeatures.query;

//   // Calculate total pages
//   const totalPages = Math.ceil((await Product.countDocuments()) / itemsPerPage);

//   // Determine if there is a next page
//   const hasNextPage = page < totalPages;

//   // Determine if there is a previous page
//   const hasPrevPage = page > 1;

//   res.status(200).json({
//       success: true,
//       results: products.length,
//       data: {
//           products,
//       },
//       page,
//       totalPages,
//       hasNextPage,
//       hasPrevPage,
//   });
// });


exports.getAllProducts = catchAsyncError(async (req, res) => {
  const itemsPerPage = 6;

  // Initialize the query with the base Product.find()
  let query = Product.find();

  // Create an instance of ApiFeature and chain the methods
  const apiFeatures = new ApiFeature(query, req.query)
    .search()
    .filter()
    .regularPagination(itemsPerPage);

    // Server-side code


  // Execute the query
  const products = await apiFeatures.query;

  // Calculate total pages based on the total number of products
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Convert image data to base64
  const productsWithBase64Images = products.map((product) => {
    const base64Image = `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`;
    return { ...product._doc, image: base64Image };
  });

  res.status(200).json({
    success: true,
    results: productsWithBase64Images.length,
    data: {
      products: productsWithBase64Images,
    },
    page: req.query.page || 1, // Use the requested page from the query
    totalPages,
  });
});



// Get Product Details by ID

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Extract the desired fields from the product object
  const { name, price, quantity } = product;

  res.status(200).json({
    success: true,
    product: {
      name,
      price,
      quantity, // Assuming you have a "quantity" field in your product
    },
  });
});


// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Update the product with the request body
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedProduct) {
    return res.status(400).json({
      success: false,
      message: "Failed to update product",
    });
  }

  res.status(200).json({
    success: true,
    product: updatedProduct,
  });

  // Handle any errors that occur during the update process
  return next(new ErrorHandler("Internal Server Error", 500));
});

// Delete
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });

  // Handle any errors that occur during the update process
  return next(new Errorhandler("Internal Server Error", 500));
});


exports.getStockQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the product by productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Send the stock quantity in the response
    return res.status(200).json({ success: true, stock: product.stock });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};