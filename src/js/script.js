const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click ());

navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click ());
})

const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25, 
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
  });

 ////slider about us

 document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-menu');
    const sliderWrapper = document.querySelector('.slider-images');
    const slides = document.querySelectorAll('.slider-images img');
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










  //// email

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');
  
    form.addEventListener('submit', function (e) {
        // 1. Previne o comportamento padrão do formulário (que seria recarregar a página)
        e.preventDefault();
  
        // 2. Limpa mensagens de resultado anteriores e mostra um feedback de carregamento
        formResult.innerHTML = 'Enviando, por favor aguarde...';
        formResult.className = ''; // Limpa as classes de sucesso/erro
  
        // 3. Coleta os dados do formulário e os transforma em um objeto JSON
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
  
        // 4. Usa a API Fetch para enviar os dados para o SEU backend local
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        })
        .then(response => {
            // 5. Analisa a resposta do servidor
            if (response.ok) {
                // Se a resposta for positiva (status 200-299), mostra sucesso
                formResult.innerHTML = 'Formulário enviado com sucesso!';
                formResult.classList.add('success');
            } else {
                // Se houver um erro, mostra a mensagem de erro vinda do servidor
                response.text().then(text => {
                    formResult.innerHTML = 'Erro ao enviar: ' + text;
                    formResult.classList.add('error');
                });
            }
        })
        .catch(error => {
            // 6. Lida com erros de rede (ex: servidor desligado ou sem conexão)
            console.log(error);
            formResult.innerHTML = 'Algo deu errado. Verifique sua conexão ou se o servidor está rodando.';
            formResult.classList.add('error');
        })
        .finally(() => {
            // 7. Esta parte SEMPRE será executada, independentemente de sucesso ou erro
            // Limpa o formulário e a mensagem de resultado após 5 segundos
            setTimeout(() => {
                formResult.innerHTML = '';
                formResult.className = '';
                form.reset();
            }, 5000);
        });
    });
  });