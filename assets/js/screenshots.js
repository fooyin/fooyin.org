document.addEventListener("DOMContentLoaded", () => {
    const links = Array.from(document.querySelectorAll(".screenshot-card"));
    const dialog = document.querySelector(".screenshot-lightbox");

    if (!dialog || typeof dialog.showModal !== "function" || links.length === 0) {
        return;
    }

    const image = dialog.querySelector("figure img");
    const caption = dialog.querySelector("figcaption strong");
    const description = dialog.querySelector("figcaption span");
    const closeButton = dialog.querySelector(".lightbox-close");
    const previousButton = dialog.querySelector(".lightbox-previous");
    const nextButton = dialog.querySelector(".lightbox-next");
    const historyStateKey = "screenshotLightbox";
    let currentIndex = 0;
    let historyEntryActive = false;

    const showScreenshot = (index) => {
        currentIndex = (index + links.length) % links.length;
        const link = links[currentIndex];
        const thumbnail = link.querySelector("img");

        if (historyEntryActive) {
            history.replaceState({ ...history.state, [historyStateKey]: currentIndex }, "");
        }

        if (image) {
            image.src = link.href;
            image.alt = thumbnail?.alt || "";
        }
        if (caption) {
            caption.textContent = link.dataset.caption || "";
        }
        if (description) {
            description.textContent = link.dataset.description || "";
        }
    };

    links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            event.preventDefault();
            showScreenshot(index);
            dialog.showModal();
            document.documentElement.classList.add("lightbox-open");
            history.pushState({ ...history.state, [historyStateKey]: index }, "");
            historyEntryActive = true;
        });
    });

    closeButton?.addEventListener("click", () => dialog.close());
    previousButton?.addEventListener("click", () => showScreenshot(currentIndex - 1));
    nextButton?.addEventListener("click", () => showScreenshot(currentIndex + 1));

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showScreenshot(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            showScreenshot(currentIndex + 1);
        }
    });

    window.addEventListener("popstate", (event) => {
        const historyIndex = event.state?.[historyStateKey];

        if (Number.isInteger(historyIndex)) {
            showScreenshot(historyIndex);
            if (!dialog.open) {
                dialog.showModal();
                document.documentElement.classList.add("lightbox-open");
            }
            historyEntryActive = true;
        } else if (dialog.open) {
            historyEntryActive = false;
            dialog.close();
        }
    });

    dialog.addEventListener("close", () => {
        document.documentElement.classList.remove("lightbox-open");
        if (image) {
            image.removeAttribute("src");
        }
        if (historyEntryActive) {
            historyEntryActive = false;
            history.back();
        }
    });
});
