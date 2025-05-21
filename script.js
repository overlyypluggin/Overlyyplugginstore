
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(itemName, price) {
    let existing = cart.find(item => item.name === itemName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: itemName, price: parseFloat(price.replace('$','')), qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(itemName + " added to cart.");
}

function loadCart() {
    const cartList = document.getElementById("cart-items");
    const totalOut = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        let row = document.createElement("tr");
        row.innerHTML = `<td>${item.name}</td><td>$${item.price.toFixed(2)}</td><td><input type='number' value='${item.qty}' min='1' onchange='updateQty(${index}, this.value)'></td><td>$${itemTotal.toFixed(2)}</td><td><button onclick='removeItem(${index})'>X</button></td>`;
        cartList.appendChild(row);
    });
    totalOut.innerText = "$" + total.toFixed(2);
}

function updateQty(index, newQty) {
    cart[index].qty = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function submitOrder() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    if (!name || !email || !address) {
        alert("Please fill in all fields.");
        return;
    }
    localStorage.setItem("orderInfo", JSON.stringify({ name, email, address }));
    window.location.href = "confirmation.html";
}
