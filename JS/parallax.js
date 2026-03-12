const section = document.querySelector("#home05depoimento");

if (section) {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("ativo");
            } else {
                section.classList.remove("ativo");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}