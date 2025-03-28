document.addEventListener("DOMContentLoaded", function () {
    loadPopularProducts();
});

function loadPopularProducts() {
    fetch("php/get_popular_products.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("popular-products");
            container.innerHTML = ""; 

            if (data.success) {
                data.products.forEach(product => {
                    const slide = document.createElement("div");
                    slide.classList.add("slide");
                    slide.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}">
                        <p>${product.name} – ${product.price}₽</p>
                        <button onclick="window.location.href='products.html?search=${encodeURIComponent(product.name)}'">Подробнее</button>
                    `;
                    container.appendChild(slide);
                });
                showSlide(0);
            } else {
                container.innerHTML = "<p>Нет доступных товаров</p>";
            }
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
}
