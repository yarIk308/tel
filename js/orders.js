function loadOrders() {
    let userId = localStorage.getItem("user_id");
    let container = document.getElementById("orders-container");

    if (!container) {
        console.error("Ошибка: контейнер #orders-container не найден!");
        return;
    }

    if (!userId) {
        container.innerHTML = "<p>Вы не авторизованы!</p>";
        return;
    }

    fetch(`php/get_orders.php?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";

            if (!data.success || data.orders.length === 0) {
                container.innerHTML = "<p>У вас пока нет заказов.</p>";
                return;
            }

            data.orders.forEach(order => {
                const orderElement = document.createElement("div");
                orderElement.classList.add("order-item");

                let itemsHtml = "<ul>";
                order.items.forEach(item => {
                    itemsHtml += `<li>${item.name} - ${item.quantity} шт. × ${item.price}₽</li>`;
                });
                itemsHtml += "</ul>";

                orderElement.innerHTML = `
                    <h3>Заказ #${order.id}</h3>
                    <p><strong>Дата:</strong> ${order.date}</p>
                    <p><strong>Статус:</strong> ${order.status}</p>
                    <p><strong>Сумма:</strong> ${order.total} ₽</p>
                    <p><strong>Товары:</strong></p>
                    ${itemsHtml}
                `;

                container.appendChild(orderElement);
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки заказов:", error);
            container.innerHTML = "<p>Ошибка при загрузке заказов.</p>";
        });
}
