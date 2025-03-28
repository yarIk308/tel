function searchProducts() {
    let query = document.getElementById("search-input").value.trim();
    let resultsContainer = document.getElementById("search-results");

    if (query === "") {
        resultsContainer.innerHTML = "<p>Введите запрос!</p>";
        return;
    }

    fetch("php/search.php?query=" + encodeURIComponent(query))
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка HTTP: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            resultsContainer.innerHTML = "";

            if (!data.success) {
                resultsContainer.innerHTML = `<p>${data.message}</p>`;
                return;
            }

            data.products.forEach(product => {
                let item = document.createElement("p");
                item.innerHTML = `<a href="products.html?search=${encodeURIComponent(product.name)}">${product.name} - ${product.price}₽</a>`;
                resultsContainer.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Ошибка поиска:", error);
            resultsContainer.innerHTML = "<p>Ошибка при загрузке данных.</p>";
        });
}
