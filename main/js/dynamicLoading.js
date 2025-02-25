// Experience loading

async function loadContent(buttonKey) {
    try {
        const response = await fetch("../../resources/data/experience.json");
        const data = await response.json();
        const category = data[buttonKey];

        if (!category) {
            document.getElementById("mainDescription").innerHTML = "No content found.";
            return;
        }

        let contentHTML = `<h4><b>${category.title}</b></h4>`;

        category.sections.forEach(section => {
            contentHTML += `<div class="skillCategory">
                <p class="skillHead ${category.colorClass}">${section.name}</p>`;

            if (Array.isArray(section.content)) {
                // If content is a list, render as <ul>
                contentHTML += `<ul>${section.content.map(item => `<li>${item}</li>`).join('')}</ul>`;
            } else if (typeof section.content === 'object') {
                // If content is key-value pairs (icons and text)
                contentHTML += `<div class="skillContainer">`;
                for (const [key, iconClass] of Object.entries(section.content)) {
                    contentHTML += `<div class="skill">
                        <i class="${iconClass}"></i>
                        <p>${key}</p>
                    </div>`;
                }
                contentHTML += `</div>`;
            }

            contentHTML += `</div>`; // Close skillCategory div
        });

        document.getElementById("mainDescription").innerHTML = contentHTML;
    } catch (error) {
        console.error("Error loading content:", error);
        document.getElementById("mainDescription").innerHTML = "Failed to load content.";
    }
}

// Projects loading

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch JSON data
        const response = await fetch("../../resources/data/projects.json"); // Adjust path if needed
        const data = await response.json();

        // Get elements from the right panel
        const heading = document.querySelector(".rightPanel h2");
        const description = document.querySelector(".rightPanel p");
        const techIconsContainer = document.querySelector(".techStakeIcons");
        const liveButton = document.querySelector(".viewLive");
        const repoButton = document.querySelector(".viewRepo");
        const demoIframe = document.querySelector(".subRight iframe");
        const demoButton = document.querySelector(".subRight button");

        // Get all buttons that trigger project loading
        const projectButtons = document.querySelectorAll(".project");

        // Function to update the right panel with a project
        async function updateRightPanel(project) {
            heading.textContent = project.heading;
            
            // Fetch and load description from external HTML file
            if (project.descriptionFile) {
                try {
                    const descResponse = await fetch(project.descriptionFile);
                    if (!descResponse.ok) throw new Error("File not found");
                    const descText = await descResponse.text();
                    description.innerHTML = descText;
                } catch (err) {
                    description.innerHTML = project.description;
                }
            } else {
                description.innerHTML = project.description;
            }

            // Update tech stack icons
            techIconsContainer.innerHTML = ""; // Clear previous icons
            project.techStackIcons.forEach(icon => {
                const iconElement = document.createElement("i");
                iconElement.className = `devicon-${icon}-plain colored`; // Devicon class structure
                techIconsContainer.appendChild(iconElement);
            });

            // Update buttons & links
            liveButton.onclick = () => {
                if (project.LiveLink) {
                    window.open(project.LiveLink, "_blank");
                } else {
                    alert("Live link is not available.");
                }
            };

            repoButton.onclick = () => {
                if (project.RepoLink) {
                    window.open(project.RepoLink, "_blank");
                } else {
                    alert("Repository link is not available.");
                }
            };

            // Update demo iframe
            if (project.DemoLink) {
                if (!demoIframe.parentNode) {
                    const iframeContainer = document.querySelector(".subRight");
                    iframeContainer.appendChild(demoIframe);
                }
                demoIframe.src = project.DemoLink;
                demoButton.onclick = () => window.open(project.DemoLink, "_blank");
            } else {
                if (demoIframe.parentNode) {
                    demoIframe.parentNode.removeChild(demoIframe);
                }
                demoButton.onclick = () => alert("Demo link is not available.");
            }
        }

        // Load the first available project by default if rightPanel is empty
        const defaultProjectKey = Object.keys(data)[0]; // Get first project key
        if (defaultProjectKey) {
            updateRightPanel(data[defaultProjectKey]);

            // Mark the first project button as selected
            const defaultButton = document.querySelector(`.project[data-project="${defaultProjectKey}"]`);
            if (defaultButton) {
                defaultButton.classList.add("selected");
            }
        }

        projectButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const projectKey = button.getAttribute("data-project"); // e.g., "Project template"
                if (data[projectKey]) {
                    updateRightPanel(data[projectKey]);
                } else {
                    console.error("Project not found:", projectKey);
                }

                // Remove 'selected' class from all buttons
                projectButtons.forEach(btn => btn.classList.remove("selected"));

                // Add 'selected' class to clicked button
                button.classList.add("selected");
            });
        });

    } catch (error) {
        console.error("Error loading content:", error);
    }
});