// Scroll to project button
function scrollToProjects() {
    document.getElementById("Project").scrollIntoView({ behavior: "smooth" });
}

// Project Intro Animation

window.addEventListener("scroll", () => {
    let scrollValue = window.scrollY;
    document.querySelectorAll(".block").forEach((block, index) => {
        block.style.transform = `translate(${scrollValue * 0.1}px, -50%)`;
    });

    document.querySelectorAll(".block2").forEach((block, index) => {
        block.style.transform = `translate(${-100 - scrollValue * 0.1}px, -50%)`;
    });
});

// Console Animation
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".links a.hidden");
    const targetSlide = document.querySelector("#Contact");
    let index = 0;
    let observerTriggered = false; // To prevent retriggering

    function typeNext() {
        if (index < elements.length) {
            let textElement = elements[index];
            let fullText = textElement.textContent;
            textElement.textContent = "";
            textElement.style.display = "block"; // Make it visible

            let i = 0;
            textElement.classList.add("cursor"); // Add cursor effect

            let typing = setInterval(() => {
                if (i < fullText.length) {
                    textElement.textContent += fullText[i];
                    i++;
                } else {
                    clearInterval(typing);
                    textElement.classList.remove("cursor"); // Remove cursor after typing
                    index++;
                    setTimeout(typeNext, 700); // Delay before next line
                }
            }, 50);
        }
    }

    // Use Intersection Observer to start typing effect when slide is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observerTriggered) {
                observerTriggered = true;
                typeNext(); // Start typing effect
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold to control when the event triggers

    observer.observe(targetSlide);

    // Refresh animation on click
    document.getElementById("refreshIcon").addEventListener("click", () => {
        index = 0;
        observerTriggered = false;
        elements.forEach(el => {
            el.textContent = el.dataset.originalText || el.textContent;
            el.style.display = "none";
        });

        // Restart typing effect when user clicks refresh
        setTimeout(() => {
            observerTriggered = true;
            typeNext();
        }, 500);
    });
});
