document.addEventListener("DOMContentLoaded", async () => {
    const menu = document.querySelector(".download-menu");
    const assetLinks = Array.from(document.querySelectorAll("[data-windows-asset]"));
    const fallbackLink = document.querySelector(".download-menu-fallback");
    const separator = document.querySelector(".download-menu-separator");
    const version = document.querySelector(".download-version");
    const versionLink = version?.querySelector("a");
    const versionText = versionLink?.querySelector("span");

    document.addEventListener("click", (event) => {
        if (menu?.open && !menu.contains(event.target)) {
            menu.removeAttribute("open");
        }
    });

    menu?.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.open) {
            menu.removeAttribute("open");
            menu.querySelector("summary")?.focus();
        }
    });

    if (assetLinks.length === 0) {
        return;
    }

    try {
        const response = await fetch("https://api.github.com/repos/fooyin/fooyin/releases/latest", {
            headers: { Accept: "application/vnd.github+json" },
        });

        if (!response.ok) {
            throw new Error(`GitHub returned ${response.status}`);
        }

        const release = await response.json();
        if (versionLink && versionText && release.tag_name && release.html_url) {
            versionLink.href = release.html_url;
            versionText.textContent = release.tag_name;
        }

        const resolvedAssets = assetLinks.map((link) => {
            const suffix = link.dataset.windowsAsset;
            return release.assets.find((asset) => asset.name.endsWith(suffix));
        });

        if (resolvedAssets.some((asset) => !asset)) {
            throw new Error("The latest release does not contain all expected Windows assets");
        }

        assetLinks.forEach((link, index) => {
            link.href = resolvedAssets[index].browser_download_url;
            link.hidden = false;
        });

        if (separator) {
            separator.hidden = false;
        }

        if (fallbackLink) {
            fallbackLink.hidden = true;
        }
    } catch (error) {
        // Keep the GitHub releases link available when the API cannot be reached
        if (versionText) {
            versionText.textContent = "View on GitHub";
        }
    }
});
