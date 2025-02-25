const searchBox = document.getElementById("search");

searchBox.addEventListener("input", function () {
    if (!this.value.startsWith(">>> ")) {
        this.value = ">>> " + this.value.replace(/^>>> /, ""); // Ensure prefix stays
    }
});

searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents new line in textarea
        scrollToMatch();
    } else if (event.key === "Backspace" && this.value === ">>> ") {
        event.preventDefault(); // Prevent deleting the prefix
    }
});

searchBox.addEventListener("blur", function () {
    if (this.value.trim() === ">>>") {
        this.value = "";
        this.placeholder = ">>> Search Section"; // Restore placeholder
    }
});

searchBox.addEventListener("focus", function () {
    if (this.value === "") {
        this.value = ">>> "; // Restore prefix when focused again
    }
});

function scrollToMatch() {
    let query = searchBox.value.replace(">>> ", "").trim().toLowerCase();
    if (query === "") {
        alert("Please enter a search query.");
        return;
    }

    // First, check if there's a section with the given ID (ignoring case)
    let sections = document.querySelectorAll("[id]");
    for (let section of sections) {
        if (section.id.toLowerCase() === query) {
            section.scrollIntoView({ behavior: "smooth", block: "center" });
            section.style.backgroundColor = "#3f489b"; // Highlight effect
            setTimeout(() => section.style.backgroundColor = "", 2000);
            return;
        }
    }

    // If no matching section ID, search for text (ignoring case)
    let elements = document.querySelectorAll("body *:not(#navbar *):not(#navbar)");
    let found = false;

    for (let element of elements) {
        if (element.textContent.toLowerCase().includes(query)) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.style.border = "2px solid #3f489b"; // Highlight effect
            setTimeout(() => element.style.border = "none", 2000);
            found = true;
            break;
        }
    }

    if (!found) {
        alert("No matching text found.");
    }
}
