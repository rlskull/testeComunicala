// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       SELEÇÃO DOS ELEMENTOS PRINCIPAIS
    ===================================================== */

    // Itens do menu desktop
    const navItems = document.querySelectorAll('#nav_list .list');

    // Itens do menu mobile
    const mobileNavItems = document.querySelectorAll('#mobileNavList .list');

    // Botão hamburguer
    const mobileBtn = document.getElementById('mobileBtn');

    // Container do menu mobile
    const mobileMenu = document.getElementById('mobileMenu');

    // Header completo, usado para aplicar classe visual
    const header = document.querySelector('header');

    // Elementos focáveis dentro do menu mobile
    const focusableSelectors = 'a, button, [tabindex]:not([tabindex="-1"])';


    /* =====================================================
       CONTROLE DE LINK ATIVO
    ===================================================== */

    // Remove a classe active de todos os itens
    function removeActive() {
        navItems.forEach(item => item.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
    }

    // Define o item ativo baseado no índice
    function setActive(index) {
        removeActive();

        if (navItems[index]) {
            navItems[index].classList.add('active');
        }

        if (mobileNavItems[index]) {
            mobileNavItems[index].classList.add('active');
        }
    }


    /* =====================================================
       SCROLL SUAVE PARA ÂNCORAS INTERNAS
    ===================================================== */

    function smoothScrollTo(targetSelector) {
        const target = document.querySelector(targetSelector);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }


    /* =====================================================
       CONTROLE DO MENU MOBILE
    ===================================================== */

    // Abrir menu mobile
    function openMobileMenu() {

        if (!mobileMenu || !mobileBtn) return;

        mobileMenu.hidden = false;                // Remove hidden semanticamente
        mobileMenu.classList.add('active');       // Ativa classe visual
        header.classList.add('menu-active');      // Caso use efeito visual
        mobileBtn.setAttribute('aria-expanded', 'true');
        mobileBtn.setAttribute('aria-label', 'Fechar menu');

        // Bloqueia scroll da página
        document.body.style.overflow = 'hidden';

        // Troca ícone para X
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-x');
        }

        // Move foco para o primeiro elemento do menu
        const focusables = mobileMenu.querySelectorAll(focusableSelectors);
        if (focusables.length > 0) {
            focusables[0].focus();
        }
    }

    // Fechar menu mobile
    function closeMobileMenu() {

        if (!mobileMenu || !mobileBtn) return;

        mobileMenu.hidden = true;                 // Esconde semanticamente
        mobileMenu.classList.remove('active');
        header.classList.remove('menu-active');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Abrir menu');

        // Libera scroll da página
        document.body.style.overflow = '';

        // Volta ícone para hamburguer
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-x');
        }

        // Retorna foco ao botão
        mobileBtn.focus();
    }

    // Alternar estado do menu
    function toggleMobileMenu() {

        if (!mobileBtn) return;

        const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    /* =====================================================
       NAVEGAÇÃO DESKTOP E MOBILE
    ===================================================== */

    function handleNavigation(items, isMobile = false) {

        items.forEach((item, index) => {

            const anchor = item.querySelector('a');
            if (!anchor) return;

            anchor.addEventListener('click', function (e) {

                const href = anchor.getAttribute('href');

                // Se for âncora interna
                if (href && href.startsWith('#')) {

                    e.preventDefault();        // Impede salto brusco
                    setActive(index);          // Marca como ativo
                    smoothScrollTo(href);      // Faz scroll suave
                }

                // Se for mobile, sempre fecha o menu após clique
                if (isMobile) {
                    closeMobileMenu();
                }
            });
        });
    }

    // Aplica navegação nos dois menus
    handleNavigation(navItems, false);
    handleNavigation(mobileNavItems, true);


    /* =====================================================
       EVENTO DO BOTÃO HAMBURGUER
    ===================================================== */

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }


    /* =====================================================
       FECHAR MENU COM TECLA ESC
    ===================================================== */

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {

            if (mobileBtn && mobileBtn.getAttribute('aria-expanded') === 'true') {
                closeMobileMenu();
            }
        }
    });


    /* =====================================================
       FECHAR MENU AO CLICAR FORA
    ===================================================== */

    document.addEventListener('click', function (e) {

        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnButton = mobileBtn.contains(e.target);

        if (
            mobileBtn &&
            mobileBtn.getAttribute('aria-expanded') === 'true' &&
            !isClickInsideMenu &&
            !isClickOnButton
        ) {
            closeMobileMenu();
        }
    });


});