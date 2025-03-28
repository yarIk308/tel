document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

// 📌 Добавление товара в корзину
function addToCart(id, name, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, imageUrl, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Товар "${name}" добавлен в корзину!`);
}

// 📌 Отображение товаров в корзине
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");

    if (!container) {
        console.error("Ошибка: контейнер #cart-container не найден!");
        return;
    }

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Ваша корзина пуста.</p>";
        return;
    }

    cart.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} ₽</p>
                <p>Количество: 
                    <button onclick="updateQuantity(${index}, -1)">➖</button> 
                    ${item.quantity} 
                    <button onclick="updateQuantity(${index}, 1)">➕</button>
                </p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;

        container.appendChild(itemElement);
    });
}

// 📌 Обновление количества товара в корзине
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Удаляем товар, если количество стало 0
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // Обновляем корзину
    }
}

// 📌 Удаление товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// 📌 Очистка корзины
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// 📌 Оформление заказа (Отправка на сервер)
function placeOrder() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
        alert("Вы не авторизованы!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }

    fetch("php/place_order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, cart: cart })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Заказ успешно оформлен!");
            localStorage.removeItem("cart"); // Очищаем корзину после заказа
            window.location.href = "zakaz.html"; // Переход на страницу заказов
        } else {
            alert("Ошибка при оформлении заказа: " + data.message);
        }
    })
    .catch(error => console.error("Ошибка оформления заказа:", error));
}
