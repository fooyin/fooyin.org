(function () {
    "use strict";

    const storageKey = "fooyin-theme";
    const root = document.documentElement;
    let savedTheme;

    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === "light" || savedTheme === "dark") {
        root.dataset.theme = savedTheme;
    }

    function themePreference() {
        return root.dataset.theme || "auto";
    }

    function updateToggle(toggle) {
        const preference = themePreference();
        const nextTheme = preference === "auto" ? "light" : preference === "light" ? "dark" : "auto";
        const label = "Theme: " + preference + ". Switch to " + nextTheme + " mode";

        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const toggle = document.querySelector(".theme-toggle");

        if (!toggle) {
            return;
        }

        updateToggle(toggle);

        toggle.addEventListener("click", function () {
            const preference = themePreference();
            const nextTheme = preference === "auto" ? "light" : preference === "light" ? "dark" : "auto";

            if (nextTheme === "auto") {
                delete root.dataset.theme;
            } else {
                root.dataset.theme = nextTheme;
            }

            try {
                localStorage.setItem(storageKey, nextTheme);
            } catch (error) {
                // The selected theme still applies for this page when storage is unavailable.
            }

            updateToggle(toggle);
        });
    });
})();
