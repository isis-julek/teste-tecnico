document.addEventListener('DOMContentLoaded', () => {
    const lottieContainer = document.getElementById('lottie-container-vitaminaD');

    if (lottieContainer) {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'componentes/lotties/vitaminad.json',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMax meet',
                clearCanvas: true,
                progressiveLoad: true,
                hideOnTransparent: true
            }
        });
    }

    const lottieContainerFerro = document.getElementById('lottie-container-ferro');

    if (lottieContainerFerro) {
        lottie.loadAnimation({
            container: lottieContainerFerro,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'componentes/lotties/ferro.json',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet', 
                clearCanvas: true,
                progressiveLoad: true,
                hideOnTransparent: true
            }
        });
    }

    const lottieContainerAmarelo = document.getElementById('lottie-container-amarelo');

    if (lottieContainerAmarelo) {
        lottie.loadAnimation({
            container: lottieContainerAmarelo,
            renderer: 'svg', loop: true, autoplay: true,
            path: 'componentes/lotties/omega3.json',
            rendererSettings: { 
                preserveAspectRatio: 'xMidYMid meet', 
                clearCanvas: true, 
                progressiveLoad: true, 
                hideOnTransparent: true }
        });
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const btnRight = document.querySelector('.btn-right');
    const btnLeft = document.querySelector('.btn-left');
    const shadow = document.querySelector('.mockup-shadow');
    const section = document.querySelector('.benefits-section');

    let currentIndex = 0;
    let isAnimating = false; 

    function trocarSlide(direcao) {
        if (isAnimating) return;
        isAnimating = true;

        if (btnLeft) btnLeft.style.pointerEvents = 'none';
        if (btnRight) btnRight.style.pointerEvents = 'none';

        const currentSlide = slides[currentIndex];
        const currentMockup = currentSlide.querySelector('.mockup-container');
        const currentPortal = currentSlide.querySelector('.portal-effect');

        let nextIndex;
        if (direcao === 'next') {
            nextIndex = (currentIndex + 1) % slides.length;
        } else {
            nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        const nextSlide = slides[nextIndex];
        const nextMockup = nextSlide.querySelector('.mockup-container');
        const nextTheme = nextSlide.getAttribute('data-theme');
        
        let nomeProduto = ""; 
        if (nextTheme === 'blue') nomeProduto = "Vitamina D";
        else if (nextTheme === 'green') nomeProduto = "Ferro";
        else if (nextTheme === 'yellow') nomeProduto = "Ômega 3";

        const anunciador = document.getElementById('anunciador-acessibilidade');

        if (window.innerWidth <= 768) {
            
            const leaveClass = direcao === 'next' ? 'leave-left' : 'leave-right';
            const enterClass = direcao === 'next' ? 'enter-right' : 'enter-left';

            nextSlide.classList.remove('is-active', 'leave-left', 'leave-right', 'enter-left', 'enter-right');
            nextSlide.classList.add(enterClass);
            currentPortal.classList.add('is-open');

            setTimeout(() => {
                currentMockup.classList.add('is-falling');
            }, 150); 

            setTimeout(() => {
                currentSlide.classList.add(leaveClass); 
            }, 300);

            setTimeout(() => {
                currentPortal.classList.remove('is-open');
                shadow.classList.add('is-hidden');
                
                currentSlide.classList.remove('is-active'); 

                if (nextTheme === 'blue') {
                    shadow.className = 'mockup-shadow shadow-blue is-hidden';
                    section.className = 'benefits-section theme-blue';
                } else if (nextTheme === 'green') {
                    shadow.className = 'mockup-shadow shadow-green is-hidden';
                    section.className = 'benefits-section theme-green';
                } else if (nextTheme === 'yellow') {
                    shadow.className = 'mockup-shadow shadow-yellow is-hidden';
                    section.className = 'benefits-section theme-yellow';
                }

                if (anunciador) anunciador.textContent = `Exibindo produto ${nomeProduto}. ${nextIndex + 1} de ${slides.length}.`;

                nextMockup.style.transition = 'none';
                nextMockup.classList.add('is-on-ceiling');
                void nextMockup.offsetWidth;
                
                nextMockup.style.transition = 'transform 0.6s ease-in';
                nextSlide.classList.remove(enterClass);
                nextSlide.classList.add('is-active'); 
                nextMockup.classList.remove('is-on-ceiling');
                shadow.classList.remove('is-hidden');

            }, 800); 


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

            return; 
        }

        currentPortal.classList.add('is-open');

        setTimeout(() => {
            currentMockup.classList.add('is-falling');
        }, 300);

        setTimeout(() => {
            currentPortal.classList.remove('is-open');
            currentSlide.classList.add('is-leaving'); 
            shadow.classList.add('is-hidden');       
        }, 800);

        setTimeout(() => {
            currentSlide.classList.remove('is-active', 'is-leaving');

            if (nextTheme === 'blue') {
                shadow.className = 'mockup-shadow shadow-blue is-hidden';
                section.className = 'benefits-section theme-blue';
            } else if (nextTheme === 'green') {
                shadow.className = 'mockup-shadow shadow-green is-hidden';
                section.className = 'benefits-section theme-green';
            } else if (nextTheme === 'yellow') {
                shadow.className = 'mockup-shadow shadow-yellow is-hidden';
                section.className = 'benefits-section theme-yellow';
            }

            if (anunciador) anunciador.textContent = `Exibindo produto ${nomeProduto}. ${nextIndex + 1} de ${slides.length}.`;

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