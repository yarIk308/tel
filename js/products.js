function loadProducts() {
    fetch("php/products.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");
            container.innerHTML = ""; // Очищаем контейнер перед загрузкой

            if (data.success) {
                data.products.forEach(product => {
                    const productElement = document.createElement("div");
                    productElement.classList.add("product-card");

                    productElement.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price} ₽</p>
                        <button onclick="addToCart(${product.id})">Добавить в корзину</button>
                    `;

                    container.appendChild(productElement);
                });
            } else {
                container.innerHTML = "<p>Нет доступных товаров</p>";
            }
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
}

// Функция добавления в корзину (заглушка)
function addToCart(productId) {
    alert("Товар " + productId + " добавлен в корзину!");
}
