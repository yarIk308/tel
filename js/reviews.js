document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const reviews = document.querySelectorAll(".review");

    function showReview(index) {
        reviews.forEach(review => {
            review.classList.remove("active");
            review.style.transform = "translateX(100%)";
            review.style.opacity = "0";
        });

        reviews[index].classList.add("active");
        reviews[index].style.transform = "translateX(0)";
        reviews[index].style.opacity = "1";
    }

    function nextReview() {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }

    // Автоматическое перелистывание каждые 4 секунды
    setInterval(nextReview, 4000);

    showReview(currentIndex);
});
