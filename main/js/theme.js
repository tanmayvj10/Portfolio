document.getElementById("theme").addEventListener("click", function () {
    let root = document.documentElement;
    let icon = document.getElementById("theme-icon");

    let isDark = getComputedStyle(root).getPropertyValue("--background").trim() === "black";

    // Define image paths
    let darkImages = {
        Home: "../../resources/img/DarkBackgroud/Home.png",
        About: "../../resources/img/DarkBackgroud/About.png",
        Experience: "../../resources/img/DarkBackgroud/Experience.png",
        ProjectIntro: "../../resources/img/DarkBackgroud/projectIntro.png",
        Project: "../../resources/img/DarkBackgroud/Project.png",
        Contact: "../../resources/img/DarkBackgroud/Contact.png"
    };

    let lightImages = {
        Home: "../../resources/img/LightBackground/Home.png",
        About: "../../resources/img/LightBackground/About.png",
        Experience: "../../resources/img/LightBackground/Experience.png",
        ProjectIntro: "../../resources/img/LightBackground/projectIntro.png",
        Project: "../../resources/img/LightBackground/Project.png",
        Contact: "../../resources/img/LightBackground/Contact.png"
    };

    // Toggle between dark and light themes
    if (isDark) {
        // Switch to light theme
        root.style.setProperty("--primary", "black");
        root.style.setProperty("--background", "white");
        root.style.setProperty("--secondary", "#7689d7");
        root.style.setProperty("--highlight1", "#007bff");
        root.style.setProperty("--highlight2", "#ff4081");
        root.style.setProperty("--highlight3", "#6a00ff");

        icon.classList.replace("fa-moon", "fa-sun");

        // Change background images for light theme
        Object.keys(lightImages).forEach(id => {
            document.getElementById(id).style.backgroundImage = `url(${lightImages[id]})`;
        });

    } else {
        // Switch back to dark theme
        root.style.setProperty("--primary", "white");
        root.style.setProperty("--background", "black");
        root.style.setProperty("--secondary", "#3f489b");
        root.style.setProperty("--highlight1", "aqua");
        root.style.setProperty("--highlight2", "#ff66c4");
        root.style.setProperty("--highlight3", "#8c52ff");

        icon.classList.replace("fa-sun", "fa-moon");

        // Change background images for dark theme
        Object.keys(darkImages).forEach(id => {
            document.getElementById(id).style.backgroundImage = `url(${darkImages[id]})`;
        });
    }
});
