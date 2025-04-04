document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

// Загружаем товары из PHP
function loadProducts() {
    fetch("php/products.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");
            container.innerHTML = ""; // Очищаем перед загрузкой новых товаров

            if (data.success) {
                data.products.forEach(product => {
                    const productElement = document.createElement("div");
                    productElement.classList.add("product-card");

                    productElement.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price} ₽</p>
                        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')">Добавить в корзину</button>
                    `;

                    container.appendChild(productElement);
                });
            } else {
                container.innerHTML = "<p>Нет доступных товаров</p>";
            }
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
}

// Функция добавления товара в корзину
function addToCart(id, name, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Загружаем корзину

    let existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, imageUrl, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем корзину
    console.log("Текущая корзина после добавления:", cart);
    alert(`Товар "${name}" добавлен в корзину!`);
}
