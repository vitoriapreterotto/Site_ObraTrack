document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-wrapper img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let intervalId;
    const intervalTime = 3000; // Intervalo de 3 segundos

    // Ajusta dinamicamente a largura do wrapper e das imagens
    function adjustSizes() {
        sliderWrapper.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => slide.style.width = `${100 / totalSlides}%`);
    }

    // Cria os indicadores (bolinhas)
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }

    // Atualiza o estado ativo dos indicadores
    function updateDots() {
        const dots = document.querySelectorAll('.dots button');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
        });
    }

    // Função para ir para um slide específico
    function goToSlide(index) {
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        updateSlider();
        updateDots();
        resetInterval();
    }

    // Função para avançar para o próximo slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Função para voltar para o slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Atualiza a posição do slider
    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    }

    // Inicia o intervalo automático
    function startInterval() {
        intervalId = setInterval(nextSlide, intervalTime);
    }

    // Limpa e reinicia o intervalo automático
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Event listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Inicialização
    adjustSizes();
    createDots();
    startInterval();

    // Garante que o slider se ajuste em caso de redimensionamento da janela
    window.addEventListener('resize', adjustSizes);
});
