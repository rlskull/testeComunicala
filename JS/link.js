document.addEventListener("DOMContentLoaded", () => {

    const root = getComputedStyle(document.documentElement);
    const currentPage = window.location.pathname.split("/").pop();

    /* =========================
       Atualizar LINKS
    ========================== */

    document.querySelectorAll(".js-link").forEach(el => {

        const cssVar = el.dataset.var;
        let url = root.getPropertyValue(cssVar).trim().replaceAll('"', "");

        if (url) {

            el.setAttribute("href", url);

            /* Verifica página atual com segurança */
            if (
                currentPage === url ||
                (currentPage === "" && url === "index.html")
            ) {
                el.setAttribute("aria-current", "page");
            }

        } else {

            /* Se a variável estiver vazia */
            el.removeAttribute("href");
            el.style.pointerEvents = "none";
            el.style.opacity = "0.4";
        }
    });

    /* =========================
       Atualizar TEXTOS
    ========================== */

    document.querySelectorAll(".js-text").forEach(el => {

        const cssVar = el.dataset.var;
        let value = root.getPropertyValue(cssVar).trim().replaceAll('"', "");

        if (value) {
            el.textContent = value;
        }
    });

});