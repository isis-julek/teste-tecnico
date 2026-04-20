document.addEventListener('DOMContentLoaded', () => {
    
    // Função para padronizar o carregamento dos lotties
    const loadLottie = (containerId, path, preserveAspectRatio) => {
        const container = document.getElementById(containerId);
        if (container) {
            lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: path,
                rendererSettings: {
                    preserveAspectRatio: preserveAspectRatio,
                    clearCanvas: true,
                    progressiveLoad: true,
                    hideOnTransparent: true
                }
            });
        }
    };

    // Inicializa as 3 animações
    loadLottie('lottie-container-vitaminaD', 'componentes/lotties/vitaminad.json', 'xMidYMax meet');
    loadLottie('lottie-container-ferro', 'componentes/lotties/ferro.json', 'xMidYMid meet');
    loadLottie('lottie-container-amarelo', 'componentes/lotties/omega3.json', 'xMidYMid meet');

    // Pegando os elementos principais
    const slides = document.querySelectorAll('.carousel-slide');
    const btnRight = document.querySelector('.btn-right');
    const btnLeft = document.querySelector('.btn-left');
    const shadow = document.querySelector('.mockup-shadow');
    const section = document.querySelector('.benefits-section');
    const anunciador = document.getElementById('anunciador-acessibilidade');

    let currentIndex = 0;
    // Trava de segurança para impedir o usuário de repetir o clique e quebrar a animação
    let isAnimating = false; 

    function trocarSlide(direcao) {
        if (isAnimating) return;
        isAnimating = true;

        // Desativa os botões enquanto a animação rola
        if (btnLeft) btnLeft.style.pointerEvents = 'none';
        if (btnRight) btnRight.style.pointerEvents = 'none';

        const currentSlide = slides[currentIndex];
        const currentMockup = currentSlide.querySelector('.mockup-container');
        const currentPortal = currentSlide.querySelector('.portal-effect');

        // Calcula qual é o próximo slide dependendo do botão clicado
        let nextIndex = direcao === 'next' 
            ? (currentIndex + 1) % slides.length 
            : (currentIndex - 1 + slides.length) % slides.length;

        const nextSlide = slides[nextIndex];
        const nextMockup = nextSlide.querySelector('.mockup-container');
        const nextTheme = nextSlide.getAttribute('data-theme');
        
        // Nomes pros leitores de tela
        const nomesProdutos = { 'blue': 'Vitamina D', 'green': 'Ferro', 'yellow': 'Ômega 3' };
        const nomeProduto = nomesProdutos[nextTheme] || 'Produto';

        // MOBILE: Animação de swipe lateral
        if (window.innerWidth <= 768) {
            const leaveClass = direcao === 'next' ? 'leave-left' : 'leave-right';
            const enterClass = direcao === 'next' ? 'enter-right' : 'enter-left';

            // Prepara o próximo slide pra entrar do lado certo
            nextSlide.classList.remove('is-active', 'leave-left', 'leave-right', 'enter-left', 'enter-right');
            nextSlide.classList.add(enterClass);
            currentPortal.classList.add('is-open');

            // Derruba o produto atual no portal
            setTimeout(() => { currentMockup.classList.add('is-falling'); }, 150); 
            setTimeout(() => { currentSlide.classList.add(leaveClass); }, 300);

            // Momento da troca de background e tema
            setTimeout(() => {
                currentPortal.classList.remove('is-open');
                shadow.classList.add('is-hidden');
                currentSlide.classList.remove('is-active'); 

                section.className = `benefits-section theme-${nextTheme}`;
                shadow.className = `mockup-shadow shadow-${nextTheme} is-hidden`;

                if (anunciador) anunciador.textContent = `Exibindo produto ${nomeProduto}. ${nextIndex + 1} de ${slides.length}.`;

                // Joga o próximo mockup para o teto para depois ele cair
                nextMockup.style.transition = 'none';
                nextMockup.classList.add('is-on-ceiling');
                void nextMockup.offsetWidth; // Força o CSS a atualizar antes da transição
                
                // Faz o novo produto cair
                nextMockup.style.transition = 'transform 0.6s ease-in';
                nextSlide.classList.remove(enterClass);
                nextSlide.classList.add('is-active'); 
                nextMockup.classList.remove('is-on-ceiling');
                shadow.classList.remove('is-hidden');
            }, 800); 

            // Limpa as classes e libera os botões pro próximo clique
            setTimeout(() => {
                currentMockup.style.transition = 'none';
                currentMockup.classList.remove('is-falling');
                
                setTimeout(() => {
                    currentMockup.style.transition = 'transform 0.6s ease-in';
                    currentIndex = nextIndex;
                    isAnimating = false;
                    if (btnLeft) btnLeft.style.pointerEvents = 'auto';
                    if (btnRight) btnRight.style.pointerEvents = 'auto';
                }, 50);
            }, 1400); 

            return; // Mata a função aqui pra não rodar o código do desktop
        }

        // DESKTOP: Produto cai no portal e o outro vem de cima
        currentPortal.classList.add('is-open');

        setTimeout(() => { currentMockup.classList.add('is-falling'); }, 300);

        setTimeout(() => {
            currentPortal.classList.remove('is-open');
            currentSlide.classList.add('is-leaving'); 
            shadow.classList.add('is-hidden');       
        }, 800);

        setTimeout(() => {
            currentSlide.classList.remove('is-active', 'is-leaving');

            // Troca as cores de fundo
            section.className = `benefits-section theme-${nextTheme}`;
            shadow.className = `mockup-shadow shadow-${nextTheme} is-hidden`;

            if (anunciador) anunciador.textContent = `Exibindo produto ${nomeProduto}. ${nextIndex + 1} de ${slides.length}.`;

            // Setup pro novo mockup cair do teto
            nextMockup.style.transition = 'none';
            nextMockup.classList.add('is-on-ceiling');
            void nextMockup.offsetWidth; 

            nextMockup.style.transition = 'transform 0.6s ease-in'; 
            nextSlide.classList.add('is-active'); 
            nextMockup.classList.remove('is-on-ceiling');
            shadow.classList.remove('is-hidden');  
        }, 1400);

        setTimeout(() => {
            currentMockup.style.transition = 'none';
            currentMockup.classList.remove('is-falling');
            
            setTimeout(() => {
                currentMockup.style.transition = 'transform 0.6s ease-in';
                currentIndex = nextIndex;
                isAnimating = false;
                if (btnLeft) btnLeft.style.pointerEvents = 'auto';
                if (btnRight) btnRight.style.pointerEvents = 'auto';
            }, 50);
        }, 2000); 
    }

    if (btnRight) btnRight.addEventListener('click', () => trocarSlide('next'));
    if (btnLeft) btnLeft.addEventListener('click', () => trocarSlide('prev'));
});