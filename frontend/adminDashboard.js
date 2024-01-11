document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("product-form");

  const userName = Cookies.get("userName");
      const userId = Cookies.get("userId");

  if (productForm) {
    productForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(productForm);
      formData.append("userId", userId);
      formData.append("userName", userName);

      const token = Cookies.get("token");
    
      console.log(token);

      try {
        const response = await axios.post(
          "http://localhost:5023/api/v4/new/product",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (data.success) {
          alert("Product created successfully!");
          // Redirect to the product HTML file
        } else {
          alert("Product creation failed: " + data.error);
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    });
  }
});
