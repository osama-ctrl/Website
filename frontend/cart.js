// Example of calculating and updating the total price
function updateTotalPrice() {
    const rows = document.querySelectorAll("#cartModal tbody tr");
    let totalPrice = 0;

    rows.forEach(row => {
        const quantity = parseInt(row.querySelector(".quantity").textContent);
        const price = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace('$', '')); // Extract the price as a float
        totalPrice += quantity * price;
    });

    document.getElementById("total-price").textContent = "$" + totalPrice.toFixed(2);
}

// Call the function initially and whenever quantities change
updateTotalPrice();

// Example of handling increment and decrement buttons (already provided earlier)
document.querySelectorAll(".increment-btn").forEach(button => {
    button.addEventListener("click", () => {
        // ...
        updateTotalPrice();
    });
});

document.querySelectorAll(".decrement-btn").forEach(button => {
    button.addEventListener("click", () => {
        // ...
        updateTotalPrice();
    });
});
