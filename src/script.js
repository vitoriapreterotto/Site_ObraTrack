function openLightbox(src) {
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';

    // Fade-in effect
    lightbox.style.opacity = 0;
    lightboxImg.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
        }
        lightbox.style.opacity = opacity;
        lightboxImg.style.opacity = opacity;
        opacity += 0.1; // Adjust for speed (smaller = slower)
    }, 10); // Interval in milliseconds
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    let opacity = 1;
    const fadeOutInterval = 20; // Interval in milliseconds (adjust for speed)
    const fadeOutStep = 0.1;   // Opacity change per interval (adjust for smoothness)
    const fadeOut = setInterval(() => {
        opacity -= fadeOutStep;
        if (opacity <= 0) {
            clearInterval(fadeOut);
            lightbox.style.display = 'none';
        } else {
            lightbox.style.opacity = opacity;
            lightboxImg.style.opacity = opacity;
        }
    }, fadeOutInterval);
}

const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
});

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

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('http://127.0.0.1:5500/send_email.php', { // **ATENÇÃO:** Ajuste a porta se necessário
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(data => {
        console.log(data); // **ADICIONE ISSO**
        alert(data);
        document.getElementById('contactForm').reset();
    })

    .catch(error => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao enviar sua mensagem.');
    });
});

