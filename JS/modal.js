
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalEquipe");
    const closeBtn = document.querySelector(".close-modal");
    const modalImg = document.getElementById("modalImg");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalConteudo = document.getElementById("modalConteudo");
    let lastFocusedElement;

    if (!modal) return;

    function openModal(item) {
        lastFocusedElement = document.activeElement;

        const img = item.getAttribute("data-img");
        const titulo = item.getAttribute("data-titulo");
        const texto = item.getAttribute("data-texto");

        if (modalImg) {
            modalImg.src = img;
            modalImg.alt = "Foto de " + titulo;
        }
        if (modalTitulo) modalTitulo.innerText = titulo;
        if (modalConteudo) modalConteudo.innerText = texto;

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Mover foco para o botão de fechar ou título
        setTimeout(() => {
            if (closeBtn) closeBtn.focus();
        }, 100);
    }

    function closeModal() {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    document.querySelectorAll(".equipe").forEach(item => {
        // Clique
        item.addEventListener("click", () => openModal(item));

        // Teclado (Enter ou Espaço)
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(item);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    // Tecla ESC para fechar modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Trap de foco no modal
    modal.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;

        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });


    // Animação da equipe ao aparecer na tela
    const equipes = document.querySelectorAll('.equipe');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    equipes.forEach(item => observer.observe(item));
});