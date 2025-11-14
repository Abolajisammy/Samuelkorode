// Function to animate a single number
function animateNumber(el) {
    const finalNumber = parseInt(el.getAttribute("data-final"));
    const duration = 1000; // total animation time (ms)
    const interval = 40;   // how fast the numbers change
    const steps = duration / interval;
    let count = 0;

    const randomizer = setInterval(() => {
        el.textContent = Math.floor(Math.random() * (finalNumber * 3)) + 1;
        count++;

        if (count >= steps) {
            clearInterval(randomizer);
            el.textContent = finalNumber; // Settle on final number
        }
    }, interval);
}

// Detect scroll into view
document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.getElementById("stats-section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const nums = entry.target.querySelectorAll("h2[data-final]");
                    nums.forEach((num) => animateNumber(num));
                }
            });
        },
        { threshold: 0.4 }
    );

    if (statsSection) {
        observer.observe(statsSection);
    }
});
