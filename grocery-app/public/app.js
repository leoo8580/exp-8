async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    const products = await res.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach((p) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
        <button onclick="orderProduct('${p._id}')">Order Now</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

async function orderProduct(productId) {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    const data = await res.json();
    alert("Order placed successfully!");
    console.log("Order:", data);
  } catch (err) {
    console.error("Error ordering:", err);
  }
}

loadProducts();
