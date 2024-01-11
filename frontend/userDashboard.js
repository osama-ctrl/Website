// document.addEventListener("DOMContentLoaded", function () {
//   const userName = Cookies.get("userName");

//   // Display the user name at the top of the page
//   const userNameElements = document.getElementsByClassName("user-name");

//   if (userNameElements.length > 0) {
//     const userNameElement = userNameElements[0];
//     userNameElement.textContent = `WELCOME, ${userName.toUpperCase()}!`;
//   }

//   const logoutButton = document.getElementById("logout-button");

//   // Add a click event listener to the logout button
//   logoutButton.addEventListener("click", function () {
//     // Clear the user name cookie
//     Cookies.remove("userName");

//     // Redirect to the login page
//     window.location.href = "main.html"; // Adjust the URL to your login page
//   });

//   const productList = document.getElementById("product-list");
//   const itemsPerPage = 6;
//   let currentPage = 1;
//   let allProducts = [];
//   let totalPages;

//   // Function to create a product card
//   function createProductCard(product) {
//     const card = document.createElement("div");
//     card.classList.add("product-card"); // Apply your custom class here

//     // Create an Image element and set the source
//     const img = document.createElement("img");
//     img.src = product.image; 
//     img.classList.add("product-image"); // Apply a custom class for the image

//     // Other product information
//     const productInfo = document.createElement("div");
//     productInfo.classList.add("product-info"); // Apply a custom class for product info
//     productInfo.innerHTML = `
//       <h5 class="product-title" data-product-name="${product.name}">${product.name}</h5>
//       <p class="product-description">${product.description}</p>
//       <p class="product-price" data-product-price="${product.price}">  Price: $${product.price}</p>
//       <p class="product-category">Category: ${product.category}</p>
//       <p class="product-stock">In Stock: ${product.stock} units</p>
//       <button class="add-to-cart-button " data-product-id="${product._id}">Add to Cart</button>
      

//     `;

//     card.appendChild(img);
//     card.appendChild(productInfo);

//     return card;
//   }

//   // Function to update the product list on a specific page
//   function updateProductList(products) {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     productList.innerHTML = "";

//     for (let i = startIndex; i < endIndex && i < products.length; i++) {
//       const productCard = createProductCard(products[i]);
//       productList.appendChild(productCard);
//     }
//   }

 
//   axios
//   .get("http://localhost:5023/api/v4/products")
//   .then((response) => {
//     allProducts = response.data.products;
//     totalPages = Math.ceil(allProducts.length / itemsPerPage);

//     // Update the product list and set up pagination
//     updateProductList(allProducts);
//     setupPagination();
//   })
//   .catch((error) => {
//     console.error("Error fetching product data:", error);
// });

// // Function to set up the pagination buttons
// function setupPagination() {
//   updatePaginationButtons();
// }




//   function createPrevButton() {
//     // Create "Previous" button
//     const prevButton = document.createElement("button");
//     prevButton.innerText = "Previous";
//     prevButton.addEventListener("click", function () {
//       if (currentPage > 1) {
//         currentPage--;
//         updateProductList(allProducts);
//         setupPagination();
//       }
//     });
//     pagination.appendChild(prevButton);
//   }

//   function createNextButton() {
//     // Create "Next" button
//     const nextButton = document.createElement("button");
//     nextButton.innerText = "Next";
//     nextButton.addEventListener("click", function () {
//       if (currentPage < totalPages) {
//         currentPage++;
//         updateProductList(allProducts);
//         setupPagination();
//       }
//     });
//     pagination.appendChild(nextButton);
//   }



//   function createPaginationButton(page) {
//     // Create a page button
//     const pageButton = document.createElement("button");
//     pageButton.innerText = page;
    
//     // Apply a different style for the current page
//     if (page === currentPage) {
//       pageButton.style.fontWeight = "bold";
     
//     }
  
//     pageButton.addEventListener("click", function () {
//       currentPage = page;
//       updateProductList(allProducts);
//       setupPagination();
//     });
  
//     pagination.appendChild(pageButton);
//   }
  

//   function updatePaginationButtons() {
//     pagination.innerHTML = "";

//     const maxButtons = 5; // Maximum number of buttons to show at once
//     const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
//     const endPage = Math.min(startPage + maxButtons - 1, totalPages);

//     if (currentPage > 1) {
//       createPrevButton();
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       createPaginationButton(page);
//     }

//     if (currentPage < totalPages) {
//       createNextButton();
//     }

//     productList.parentNode.appendChild(pagination);
//   }



// // Function to update the product list on a specific page
// function updateProductList(products) {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   productList.innerHTML = "";

//   for (let i = startIndex; i < endIndex && i < products.length; i++) {
//     const productCard = createProductCard(products[i]);
//     productList.appendChild(productCard);
//   }
// }



// function filterProductsByPrice(range) {
  
//   const filtered = allProducts.filter((product) => {
//       switch (range) {
//           case "0-1000":
//               return true;
              
//           case "0-200":
//               return product.price >= 0 && product.price <= 200;
              
//           case "200-400":
//             return product.price >= 200 && product.price <= 400;
//           default:
//               return true;
//       }
   
//   });

//   // Sort the filtered products alphabetically by their name
//   const sortedFiltered = filtered.sort((a, b) => a.name.localeCompare(b.name));

//   // Update total pages based on the filtered products
//   totalPages = Math.ceil(sortedFiltered.length / itemsPerPage);

//   // Update the product list and set up pagination
//   currentPage = 1; // Reset to the first page after filtering
//   updateProductList(sortedFiltered);
//   setupPagination();

//   return sortedFiltered;
// }



// const priceRangeSelect = document.getElementById("price-range");
// priceRangeSelect.addEventListener("change", function () {
//   const selectedRange = priceRangeSelect.value;
//   filterProductsByPrice(selectedRange);
// });

// const searchInput = document.getElementById("search-input");
// const noResultsMessage = document.getElementById("no-results-message");

// searchInput.addEventListener("input", function () {
//   const searchTerm = searchInput.value.toLowerCase();
//   const filteredProducts = allProducts.filter((product) => {
//     return product.name.toLowerCase().includes(searchTerm);
//   });

//   if (filteredProducts.length > 0) {
//     noResultsMessage.style.display = "none"; // Hide the message if there are results
//   } else {
//     noResultsMessage.style.display = "block"; 
//     hidePagination(); // Display the message if no results are found
//   }

//   currentPage = 1;
//   updateProductList(filteredProducts);
//   setupPagination();
// });

// function hidePagination() {
//   pagination.style.display = "none"; // Hide the pagination container

//   // Assuming each pagination button has a class 'page-button', you can hide them
//   const pageButtons = document.querySelectorAll(".page-button");
//   pageButtons.forEach((button) => {
//     button.style.display = "none";
//   });
// }



//   productList.addEventListener("click", function (event) {
//     if (event.target.classList.contains("add-to-cart-button")) {
//       const productCard = event.target.closest(".product-card");

//       if (productCard) {
//         const productName =
//           productCard.querySelector(".product-title").textContent;
//         const productPriceString =
//           productCard.querySelector(".product-price").textContent;
//         const productPrice = parseFloat(
//           productPriceString.replace("Price: $", "").trim()
//         );

//         const productId = event.target.getAttribute("data-product-id");

//         // Find the selected product by its ID

//         const userName = Cookies.get("userName");
//         const userId = Cookies.get("userId");
//         const productData = {
//           userId,
//           userName,
//           productId: productId,
//           productName: productName,
//           productPrice: productPrice,
//           productQuantity: 1, // Use the entered quantity
//         };

//         // Use axios to send the product data to the server
//         axios
//           .post("http://localhost:5023/api/v5/addToCart", productData)
//           .then((response) => {
//             console.log("Successfully added to the cart");
//           })
//           .catch((error) => {
//             console.error("Error sending product data to the server:", error);
//           });
//       }
//     }
//   });

//   document
//     .getElementById("openCartButton")
//     .addEventListener("click", function () {
//       // Open the cart modal when the button is clicked
//       $("#cartModal").modal("show");

//       // Fetch user's cart items
//       const userId = Cookies.get("userId"); // Replace with your token-based user ID retrieval
//       fetchUserCartItems(userId);
//     });
//   document.getElementById("close-cart").addEventListener("click", function () {
//     $("#cartModal").modal("hide"); // Use Bootstrap's modal("hide") method
//   });

//   // Function to fetch and display user's cart items
//   function fetchUserCartItems(userId) {
//     const cartItemsContainer = document.getElementById("cartItems");
//     // Send a GET request to your server to fetch user's cart items by userId
//     axios
//       .get(`http://localhost:5023/api/v5/getProducts/${userId}`)
//       .then((response) => {
//         // Handle the response and populate the cart modal
//         const cartItems = response.data.products;

//         cartItemsContainer.innerHTML = "";

//         let total = 0; // Initialize the total price variable

//         if (Array.isArray(cartItems)) {
//           cartItems.forEach((item) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//             <td>${item.productName}</td>
//             <td>
//               <button class="btn btn-success increment-quantity" data-product-id="${
//                 item.productId
//               }">+</button>
//               <span class="quantity">${item.productQuantity}</span>
//               <button class="btn btn-danger decrement-quantity" data-product-id="${
//                 item.productId
//               }">-</button>
//             </td>
//             <td>$${item.productPrice * item.productQuantity}</td>

//             <td>
//             <button class="btn btn-warning delete-product" data-product-id="${
//               item.productId
//             }">Remove </button>
//           </td>
            
//           `;
//             cartItemsContainer.appendChild(row);

//             total += item.productPrice * item.productQuantity; // Update the total price
//           });

//           // Display the total price
//           document.getElementById(
//             "cart-total-price"
//           ).textContent = `$${total.toFixed(2)}`;
//         } else {
//           // Handle unexpected response format
//           console.error("Unexpected response format for cart items");
//         }

//         // Use event delegation to handle quantity adjustments
//         cartItemsContainer.addEventListener("click", function (event) {
//           const target = event.target;
//           if (target.classList.contains("increment-quantity")) {
//             // Handle quantity increment
//             const productId = target.getAttribute("data-product-id");
//             incrementProductQuantity(userId, productId);
//           } else if (target.classList.contains("decrement-quantity")) {
//             // Handle quantity decrement
//             const productId = target.getAttribute("data-product-id");
//             decrementProductQuantity(userId, productId);
//           } else if (target.classList.contains("delete-product")) {
//             // Handle product deletion
//             const productId = target.getAttribute("data-product-id");
//             deleteProductFromCart(userId, productId);
//           }
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching cart items:", error);
//       });
//   }

//   // Function to increment the quantity of a product
//   // Function to increment the quantity of a product
//   function incrementProductQuantity(userId, productId) {
//     // Send a PUT request to increment the product's quantity
//     axios
//       .put(
//         `http://localhost:5023/api/v5/updateQuantity/${userId}/${productId}`,
//         { operation: "increment" }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           // Quantity updated successfully, update the cart display
//           fetchUserCartItems(userId);
//         } else {
//           console.error(
//             "Error updating product quantity:",
//             response.data.error
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating product quantity:", error);
//       });
//   }

//   // Function to decrement the quantity of a product
//   function decrementProductQuantity(userId, productId) {
//     // Send a PUT request to decrement the product's quantity
//     axios
//       .put(
//         `http://localhost:5023/api/v5/updateQuantity/${userId}/${productId}`,
//         { operation: "decrement" }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           // Quantity updated successfully, update the cart display
//           fetchUserCartItems(userId);
//         } else {
//           console.error(
//             "Error updating product quantity:",
//             response.data.error
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating product quantity:", error);
//       });
//   }

//   // Function to delete a product from the cart
//   function deleteProductFromCart(userId, productId) {
//     // Send a DELETE request to remove the product from the cart
//     axios
//       .delete(
//         `http://localhost:5023/api/v5/deleteProduct/${userId}/${productId}`
//       )
//       .then((response) => {
//         if (response.data.success) {
//           // Product removed successfully, update the cart display
//           fetchUserCartItems(userId);
//         } else {
//           console.error(
//             "Error removing product from cart:",
//             response.data.error
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error removing product from cart:", error);
//       });
//   }

//   const checkoutButton = document.getElementById("checkoutButton");

//   // Add a click event listener to the button
//   checkoutButton.addEventListener("click", function() {
//       // Redirect to the checkout page
//       window.location.href = "payment.html"; // Replace with the URL of your checkout page
//   });

  
// });





document.addEventListener("DOMContentLoaded", function () {
  const userName = Cookies.get("userName");

  // Display the user name at the top of the page
  const userNameElements = document.getElementsByClassName("user-name");

  if (userNameElements.length > 0) {
    const userNameElement = userNameElements[0];
    userNameElement.textContent = `WELCOME, ${userName.toUpperCase()}!`;
  }

  const logoutButton = document.getElementById("logout-button");

  // Add a click event listener to the logout button
  logoutButton.addEventListener("click", function () {
    // Clear the user name cookie
    Cookies.remove("userName");

    // Redirect to the login page
    window.location.href = "main.html"; // Adjust the URL to your login page
  });

  const productList = document.getElementById("product-list");
  const pagination = document.getElementById("pagination");
  const itemsPerPage=6 ;
  let currentPage = 1;
  let totalPages;
  let allProducts = []; // Maintain a separate array to store all products
  
  // Function to create a product card
  function createProductCard(product) {
    // console.log("Creating product card:", product);
  
  const card = document.createElement("div");
  card.classList.add("product-card");

  
    const img = document.createElement("img");
    img.src = product.image;
    img.classList.add("product-image");
  
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productInfo.innerHTML = `
      <h5 class="product-title" data-product-name="${product.name}">${product.name}</h5>
      <p class="product-description">${product.description}</p>
      <p class="product-price" data-product-price="${product.price}">Price: $${product.price}</p>
      <p class="product-category">Category: ${product.category}</p>
      <p class="product-stock">In Stock: ${product.stock} units</p>
      <button class="add-to-cart-button " data-product-id="${product._id}">Add to Cart</button>
    `;
  
    card.appendChild(img);
    card.appendChild(productInfo);
  
    return card;
  }
  
  // Function to update the product list on a specific page
  // Function to update the product list on a specific page
// Function to update the product list on a specific page
function updateProductList(products) {
  // Clear the existing content of the productList
  productList.innerHTML = "";
  console.log(products);
  console.log(products.length);




  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage 

  for (let i = 0; i < products.length; i++) {
    const productCard = createProductCard(products[i]);
    productList.appendChild(productCard);
  }




  
}


function fetchProducts() {
  axios
    .get(`http://localhost:5023/api/v4/products?page=${currentPage}`)
    .then((response) => {
      if (response && response.data) {
        const { data, totalPages: serverTotalPages } = response.data;
        totalPages = serverTotalPages;

        // console.log("Received products from server:", data.products);
        allProducts = data.products;
        // console.log("Updated allProducts array:", allProducts);

        updateProductList(allProducts);

        // Ensure totalPages is set before calling setupPagination
        if (typeof totalPages !== 'undefined') {
          setupPagination();
        }
      } else {
        console.error(
          "Error fetching product data: Response or response.data is undefined"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}


// Function to set up the pagination buttons
function setupPagination() {
  
  updatePaginationButtons();
  
  
}

function updatePaginationButtons() {
  pagination.innerHTML = "";

  const maxButtons = 5; // Maximum number of buttons to show at once
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  if (currentPage > 1) {
    createPrevButton();
  }

  for (let page = startPage; page <= endPage; page++) {
    createPaginationButton(page);
  }

  if (currentPage < totalPages) {
    createNextButton();
  }
}


// Initial fetch on page load




  
  function createPrevButton() {
    // Create "Previous" button
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        fetchProducts();
       
      }
    });
    pagination.appendChild(prevButton);
  }
  
  function createNextButton() {
    // Create "Next" button
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        fetchProducts();
        // Move this line here
      }
    });
    pagination.appendChild(nextButton);
  }

  fetchProducts();
  
  function createPaginationButton(page) {
    // Create a page button
    const pageButton = document.createElement("button");
    pageButton.innerText = page;
  
    // Apply a different style for the current page
    if (page === currentPage) {
      pageButton.style.fontWeight = "bold";
    }
  
    pageButton.addEventListener("click", function () {
      currentPage = page;
      fetchProducts();
     
    });
  
    pagination.appendChild(pageButton);
  }
  

  // const priceRangeSelect = document.getElementById("price-range");
  // const searchInput = document.getElementById("search-input");
  
  // async function fetchFilterProducts() {
  //   try {
  //     const priceRange = priceRangeSelect.value;
  //     const [price_gte, price_lte] = priceRange.split('-'); // Split the range into min and max
  
  //     const searchTerm = searchInput.value.toLowerCase();
  
  //     const url = `http://localhost:5023/api/v4/products?price_gte=${price_gte}&price_lte=${price_lte}&keyword=${searchTerm}`;
  //     console.log("Fetching products with URL:", url);
  
  //     const response = await axios.get(url);
  
  //     if (response && response.data) {
  //       const { data } = response.data;
  //       allProducts = data.products;
  
  //       console.log("Filter Products", allProducts);
  
  //       updateProductList(allProducts);
        
        
   
  //     } 
  //     else {
  //       console.error("Error fetching product data: Response or response.data is undefined");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // }
  
  // // Initial fetch on page load
  // fetchFilterProducts();
  
  
  // // Event listeners for filtering
  // priceRangeSelect.addEventListener("change", fetchFilterProducts);
  // searchInput.addEventListener("input", fetchFilterProducts);
  
  // function hidePagination() {
  //     pagination.style.display = "none"; // Hide the pagination container
    
  //     // Assuming each pagination button has a class 'page-button', you can hide them
  //     const pageButtons = document.querySelectorAll(".page-button");
  //     pageButtons.forEach((button) => {
  //       button.style.display = "none";
  //     });
  //   }
   
  const priceRangeSelect = document.getElementById("price-range");
  const searchInput = document.getElementById("search-input");
  
  async function fetchFilterProducts() {
    try {
      const priceRange = priceRangeSelect.value;
      const [price_gte, price_lte] = priceRange.split('-'); // Split the range into min and max
  
      const searchTerm = searchInput.value.toLowerCase();
  
      const url = `http://localhost:5023/api/v4/products?price_gte=${price_gte}&price_lte=${price_lte}&keyword=${searchTerm}`;
      console.log("Fetching products with URL:", url);
  
      const response = await axios.get(url);
  
      if (response && response.data) {
        const { data } = response.data;
        allProducts = data.products;
  
        console.log("Filter Products", allProducts);
  
        updateProductList(allProducts);
  
        // Check if there are no products after filtering
        if (allProducts.length === 0) {
          hidePagination();
        } 
      } else {
        console.error("Error fetching product data: Response or response.data is undefined");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  
  function hidePagination() {
    pagination.style.display = "none"; // Hide the pagination container
  
    // Assuming each pagination button has a class 'page-button', you can hide them
    const pageButtons = document.querySelectorAll(".page-button");
    pageButtons.forEach((button) => {
      button.style.display = "none";
    });
    const noResultsMessage = document.getElementById("no-results-message");
    noResultsMessage.style.display = "block";
  }
  
 
  
  // Initial fetch on page load
  fetchFilterProducts();
  
  // Event listeners for filtering
  priceRangeSelect.addEventListener("change", fetchFilterProducts);
  searchInput.addEventListener("input", fetchFilterProducts);
  


  

  // productList.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("add-to-cart-button")) {
  //     const productCard = event.target.closest(".product-card");

  //     if (productCard) {
  //       const productName =
  //         productCard.querySelector(".product-title").textContent;
  //       const productPriceString =
  //         productCard.querySelector(".product-price").textContent;
  //       const productPrice = parseFloat(
  //         productPriceString.replace("Price: $", "").trim()
  //       );

  //       const productId = event.target.getAttribute("data-product-id");

  //       // Find the selected product by its ID

  //       const userName = Cookies.get("userName");
  //       const userId = Cookies.get("userId");
  //       const productData = {
  //         userId,
  //         userName,
  //         productId: productId,
  //         productName: productName,
  //         productPrice: productPrice,
  //         productQuantity: 1, // Use the entered quantity
  //       };

  //       // Use axios to send the product data to the server
  //       axios
  //         .post("http://localhost:5023/api/v5/addToCart", productData)
  //         .then((response) => {
  //           console.log("Successfully added to the cart");
  //         })
  //         .catch((error) => {
  //           console.error("Error sending product data to the server:", error);
  //         });
  //     }
  //   }
  // });



  productList.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart-button")) {
      const productCard = event.target.closest(".product-card");
  
      if (productCard) {
        const productName = productCard.querySelector(".product-title").textContent;
        const productPriceString = productCard.querySelector(".product-price").textContent;
        const productPrice = parseFloat(productPriceString.replace("Price: $", "").trim());
        const productId = event.target.getAttribute("data-product-id");
  
        // Fetch the stock quantity of the selected product
        axios.get(`http://localhost:5023/api/v4/products/${productId}`)
          .then((response) => {
            const stockQuantity = response.data.stock;
  
            // Check if the quantity in the cart exceeds the available stock
            const cartQuantity = getCartQuantity(productId);
  
            if (cartQuantity < stockQuantity) {
              const userName = Cookies.get("userName");
              const userId = Cookies.get("userId");
              const productData = {
                userId,
                userName,
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                productQuantity: 1, // Use the entered quantity
              };
  
              // Use axios to send the product data to the server
              axios.post("http://localhost:5023/api/v5/addToCart", productData)
                .then((response) => {
                  console.log("Successfully added to the cart");
                })
                .catch((error) => {
                  console.error("Error sending product data to the server:", error);
                });
            } else {
              console.log("Exceeds available stock. Cannot add to cart.");
            }
          })
          .catch((error) => {
            console.error("Error fetching stock quantity:", error);
          });
      }
    }
  });
  
  // Function to get the quantity of a specific product in the cart
  function getCartQuantity(productId) {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartItems = Array.from(cartItemsContainer.querySelectorAll("tr"));
  
    const matchingItem = cartItems.find((item) => {
      const id = item.querySelector("button[data-product-id]").getAttribute("data-product-id");
      return id === productId;
    });
  
    if (matchingItem) {
      return parseInt(matchingItem.querySelector(".quantity").textContent);
    }
  
    return 0;
  }
  

  document
    .getElementById("openCartButton")
    .addEventListener("click", function () {
      // Open the cart modal when the button is clicked
      $("#cartModal").modal("show");

      // Fetch user's cart items
      const userId = Cookies.get("userId"); // Replace with your token-based user ID retrieval
      fetchUserCartItems(userId);
    });
  document.getElementById("close-cart").addEventListener("click", function () {
    $("#cartModal").modal("hide"); // Use Bootstrap's modal("hide") method
  });

  // Function to fetch and display user's cart items
  function fetchUserCartItems(userId) {
    const cartItemsContainer = document.getElementById("cartItems");
    // Send a GET request to your server to fetch user's cart items by userId
    axios
      .get(`http://localhost:5023/api/v5/getProducts/${userId}`)
      .then((response) => {
        // Handle the response and populate the cart modal
        const cartItems = response.data.products;

        cartItemsContainer.innerHTML = "";

        let total = 0; // Initialize the total price variable

        if (Array.isArray(cartItems)) {
          cartItems.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.productName}</td>
            <td>
              <button class="btn btn-success increment-quantity" data-product-id="${
                item.productId
              }">+</button>
              <span class="quantity">${item.productQuantity}</span>
              <button class="btn btn-danger decrement-quantity" data-product-id="${
                item.productId
              }">-</button>
            </td>
            <td>$${item.productPrice * item.productQuantity}</td>

            <td>
            <button class="btn btn-warning delete-product" data-product-id="${
              item.productId
            }">Remove </button>
          </td>
            
          `;
            cartItemsContainer.appendChild(row);

            total += item.productPrice * item.productQuantity; // Update the total price
          });

          // Display the total price
          document.getElementById(
            "cart-total-price"
          ).textContent = `$${total.toFixed(2)}`;
        } else {
          // Handle unexpected response format
          console.error("Unexpected response format for cart items");
        }

        // Use event delegation to handle quantity adjustments
        cartItemsContainer.addEventListener("click", function (event) {
          const target = event.target;
          if (target.classList.contains("increment-quantity")) {
            // Handle quantity increment
            const productId = target.getAttribute("data-product-id");
            incrementProductQuantity(userId, productId);
          } else if (target.classList.contains("decrement-quantity")) {
            // Handle quantity decrement
            const productId = target.getAttribute("data-product-id");
            decrementProductQuantity(userId, productId);
          } else if (target.classList.contains("delete-product")) {
            // Handle product deletion
            const productId = target.getAttribute("data-product-id");
            deleteProductFromCart(userId, productId);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }

  // Function to increment the quantity of a product
  // Function to increment the quantity of a product
  function incrementProductQuantity(userId, productId) {
    // Send a PUT request to increment the product's quantity
    axios
      .put(
        `http://localhost:5023/api/v5/updateQuantity/${userId}/${productId}`,
        { operation: "increment" }
      )
      .then((response) => {
        if (response.data.success) {
          // Quantity updated successfully, update the cart display
          fetchUserCartItems(userId);
        } else {
          console.error(
            "Error updating product quantity:",
            response.data.error
          );
        }
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  }

  // Function to decrement the quantity of a product
  function decrementProductQuantity(userId, productId) {
    // Send a PUT request to decrement the product's quantity
    axios
      .put(
        `http://localhost:5023/api/v5/updateQuantity/${userId}/${productId}`,
        { operation: "decrement" }
      )
      .then((response) => {
        if (response.data.success) {
          // Quantity updated successfully, update the cart display
          fetchUserCartItems(userId);
        } else {
          console.error(
            "Error updating product quantity:",
            response.data.error
          );
        }
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  }

  // Function to delete a product from the cart
  function deleteProductFromCart(userId, productId) {
    // Send a DELETE request to remove the product from the cart
    axios
      .delete(
        `http://localhost:5023/api/v5/deleteProduct/${userId}/${productId}`
      )
      .then((response) => {
        if (response.data.success) {
          // Product removed successfully, update the cart display
          fetchUserCartItems(userId);
        } else {
          console.error(
            "Error removing product from cart:",
            response.data.error
          );
        }
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  }

  const checkoutButton = document.getElementById("checkoutButton");

  // Add a click event listener to the button
  // checkoutButton.addEventListener("click", function() {
  //     // Redirect to the checkout page
  //     window.location.href = "payment.html"; // Replace with the URL of your checkout page
  // });

  
});