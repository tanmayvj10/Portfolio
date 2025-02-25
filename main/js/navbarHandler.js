// Toggle Menu
function toggleMenu() {
    document.querySelector("#theme").classList.toggle("show");
    document.querySelector("#connects").classList.toggle("show");
    document.querySelector("#navigation").classList.toggle("show");
    document.querySelector("#navbar").classList.toggle("show");
    // Select the hamburger icon
    const menuIcon = document.querySelector(".hamburger");

    // Check if menu is open
    const isOpen = document.querySelector("#navbar").classList.contains("show");
    const isSmallScreen = window.matchMedia("(aspect-ratio< 1)").matches; // Adjust as needed


    if (isOpen && isSmallScreen) {
        document.body.classList.add("no-scroll"); // Disable scrolling
        menuIcon.innerHTML = "&times;"; // Show 'X' when menu is open
    } else {
        document.body.classList.remove("no-scroll"); // Enable scrolling
        menuIcon.innerHTML = "☰"; // Show hamburger icon when menu is closed
    }
}

// Highlight section in navbar
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slides");
    const navLinks = document.querySelectorAll(".nav");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                document.querySelector(`.nav[href="#${entry.target.id}"]`).classList.add("active");
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slides => observer.observe(slides));
});
