
const products = [
  { id: 1, name: "Block Graphic Tee", price: 799 },
  { id: 2, name: "Everyday Essential", price: 699 },
  { id: 3, name: "After Hours Tee", price: 899 },
  { id: 4, name: "Old Town Classic", price: 749 }
];

const cart = [];

const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  cartPanel.hidden = false;
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);

  cartItems.replaceChildren();

  if (cart.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Your bag is empty. Explore the collection!";
    cartItems.append(message);
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-row";

    const description = document.createElement("span");
    description.textContent =
      `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "REMOVE";
    remove.setAttribute("aria-label", `Remove ${item.name}`);
    remove.addEventListener("click", () => removeFromCart(item.id));

    row.append(description, remove);
    cartItems.append(row);
  });
}

document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", () => {
    addToCart(Number(button.dataset.id));
  });
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");

    const selected = button.dataset.filter;

    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden =
        selected !== "all" && card.dataset.category !== selected;
    });
  });
});

document.getElementById("cartToggle").addEventListener("click", () => {
  cartPanel.hidden = !cartPanel.hidden;
});

document.getElementById("cartClose").addEventListener("click", () => {
  cartPanel.hidden = true;
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  alert("Checkout is not connected yet. Add a payment and order system before launch.");
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletterMessage").textContent =
    "This demo does not save email addresses yet. Connect a newsletter service to activate signup.";
});

document.getElementById("year").textContent = new Date().getFullYear();

renderCart();