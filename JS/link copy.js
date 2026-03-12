document.addEventListener("DOMContentLoaded", () => {
    const root = getComputedStyle(document.documentElement);

    /* Atualizar LINKS */
    document.querySelectorAll(".js-link").forEach(el => {
        const cssVar = el.dataset.var;
        let url = root.getPropertyValue(cssVar).trim().replaceAll('"', "");

        if (url) {
            el.setAttribute("href", url);
        } else {
            // Se o link ainda estiver vazio
            el.style.pointerEvents = "none";
            el.style.opacity = "0.4";
        }
    });

    /* Atualizar textos (telefone, endereço etc.) */
    document.querySelectorAll(".js-text").forEach(el => {
        const cssVar = el.dataset.var;
        let value = root.getPropertyValue(cssVar).trim().replaceAll('"', "");

        if (value) {
            el.textContent = value;
        }
    });
});