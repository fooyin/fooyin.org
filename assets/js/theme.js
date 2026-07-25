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

  function currentTheme() {
    if (root.dataset.theme) {
      return root.dataset.theme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function updateToggle(toggle) {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    const label = "Switch to " + nextTheme + " mode";

    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-pressed", currentTheme() === "dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");

    if (!toggle) {
      return;
    }

    updateToggle(toggle);

    toggle.addEventListener("click", function () {
      var nextTheme = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The selected theme still applies for this page when storage is unavailable.
      }

      updateToggle(toggle);
    });
  });
})();
