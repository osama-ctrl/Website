const stripe = Stripe("pk_test_51NzKdyBBEhPDjSj8Dc0Z3yMyYi2EM9JZ56dPhGshMxTZ6QkJ25msap0HtNurZ2XYrw47kLpRpr0EJDxJpsKclHKU00yFQQDP4N"); // Replace with your actual publishable key

let elements;
initialize();
checkStatus();

document.querySelector("#payment-form").addEventListener("submit", handleSubmit);

async function initialize() {
  const response = await fetch("http://localhost:5023/api/v5/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [] }), // Pass the items you want to purchase
  });

  const { clientSecret } = await response.json();
  elements = stripe.elements({ clientSecret });

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: "http://127.0.0.1:5500/frontend/meesage.html",
    },
  });

  if (error) {
    showMessage(error.message);
  } else {
    showMessage("Payment successful!");
  }

  setLoading(false);
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

function setLoading(isLoading) {
  const submitButton = document.querySelector("#submit");
  const spinner = document.querySelector("#spinner");
  const buttonText = document.querySelector("#button-text");

  if (isLoading) {
    submitButton.disabled = true;
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
  } else {
    submitButton.disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }
}
