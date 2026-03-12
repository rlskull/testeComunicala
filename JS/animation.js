// Animação com IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // anima só 1 vez
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});


/* efeito colorido */

    const imagens = document.querySelectorAll(".imagemPersistente");

    imagens.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.classList.add("img-colorido");
        });
    });
