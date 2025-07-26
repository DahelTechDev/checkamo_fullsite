// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = mobileMenuToggle.querySelector("i");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  // Animate hamburger to X
  if (mobileMenu.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on links
const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
mobileMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  });
});

// Typewriter Effect with Multiple Languages
const phrases = [
  "Check am oo!", // Pidgin (original)
  "Verify it!", // English
  "Sé yak afon!", // efik
  "tabbatar da shi!", // Hausa
  "lelee ya!", // Igbo
  "vérifie-le!", // French
  "verificarlo!", // Spanish verificarlo
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");
const typingSpeed = 200;
const deletingSpeed = 100;
const pauseTime = 3000;

function typeWriter() {
  const current = phrases[currentPhrase];

  if (isDeleting) {
    typewriterElement.textContent = current.substring(0, currentChar - 1);
    currentChar--;

    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(typeWriter, 500);
    } else {
      setTimeout(typeWriter, deletingSpeed);
    }
  } else {
    typewriterElement.textContent = current.substring(0, currentChar + 1);
    currentChar++;

    if (currentChar === current.length) {
      setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, pauseTime);
    } else {
      setTimeout(typeWriter, typingSpeed);
    }
  }
}

// Start typewriter effect
setTimeout(typeWriter, 1000);

// Smooth scroll effect for navigation
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(255, 255, 255, 0.15)";
    nav.style.backdropFilter = "blur(25px)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.1)";
    nav.style.backdropFilter = "blur(20px)";
  }
});

// Add click ripple effect to CTA buttons
const ctaButtons = document.querySelectorAll(
  ".primary-cta, .secondary-cta, .cta-button"
);
ctaButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Parallax effect for floating elements
window.addEventListener("mousemove", (e) => {
  const floatingElements = document.querySelectorAll(".floating-element");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = (x - 0.5) * speed * 20;
    const yOffset = (y - 0.5) * speed * 20;

    element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Add glitch effect to logo on hover
const logo = document.querySelector(".logo");
logo.addEventListener("mouseenter", () => {
  logo.style.animation = "glitch 0.3s linear";
});

logo.addEventListener("animationend", () => {
  logo.style.animation = "";
});

// Add glitch keyframes
const glitchStyle = document.createElement("style");
glitchStyle.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
document.head.appendChild(glitchStyle);

// SWIPER SCRIPT

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".complaints-swiper", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    on: {
      slideChange: function () {
        // Add extra emphasis animation to active slide
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.style.transform += " rotateY(0deg)";
        }
      },
    },
  });

  const swiperEl = document.querySelector(".complaints-swiper");
  swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
  });

  swiperEl.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });

  // Add intersection observer for animation triggers
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  // Observe floating elements
  document.querySelectorAll(".bubble, .geometric-shape").forEach((el) => {
    observer.observe(el);
  });
});

//   HOW IT WORKS SECTION
// Intersection Observer for step animations
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll(".section-header, .step").forEach((el) => {
  observer.observe(el);
});

// Create floating particles
function createParticles1() {
  const container = document.querySelector(".floating-particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";
    container.appendChild(particle);
  }
}

// Initialize particles on load
window.addEventListener("load", createParticles1);

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = "smooth";

// Enhanced hover effects with JavaScript
document.querySelectorAll(".step-content").forEach((content) => {
  content.addEventListener("mouseenter", () => {
    content.style.transition = "all 0.3s ease";
  });

  content.addEventListener("mouseleave", () => {
    content.style.transition = "all 0.3s ease";
  });
});

//    INDUSTRIES WE SERVE SECTION -- GLOBE

const industries = [
  {
    name: "Real Estate",
    image:
      "https://privateproperty.ng/news/wp-content/uploads/2022/09/real-estate.webp",
  },
  {
    name: "Logistics",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "Freelance",
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "Marketplace",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "Companionship/discreet services",
    image: "/waitlistAssets/images/com-ship.avif",
  },
  {
    name: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "Events",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=400&fit=crop&crop=center",
  },
  {
    name: "Recruitment",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
  },
];

let scene,
  camera,
  renderer,
  globe,
  cards = [];
let isMobile = window.innerWidth <= 768;

function initThreeJS() {
  const canvas = document.getElementById("globe-canvas");
  const container = canvas.parentElement;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  const size = isMobile ? Math.min(window.innerWidth * 0.6, 250) : 500;
  renderer.setSize(size, size);
  renderer.setClearColor(0x000000, 0);

  // Create Earth
  const geometry = new THREE.SphereGeometry(1, 54, 64);

  // Load Earth texture
  const loader = new THREE.TextureLoader();
  // const earthTexture = loader.load("../images/globe.jpg");
  const earthTexture = loader.load(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;
  earthTexture.repeat.set(1, 1);

  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    transparent: false,
    opacity: 0.9,
  });

  globe = new THREE.Mesh(geometry, material);
  globe.scale.set(1.6, 1.6, 1.6);
  scene.add(globe);

  // Add atmosphere glow
  const atmosphereGeometry = new THREE.SphereGeometry(1.4, 74, 74);
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x04d9c4,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  camera.position.z = 3;

  if (!isMobile) {
    createOrbitingCards();
  } else {
    createMobileGrid();
  }
}

function createOrbitingCards() {
  const radius = 4.5;
  industries.forEach((industry, index) => {
    const angle = (index / industries.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const card = document.createElement("div");
    card.className = "industry-card";
    card.innerHTML = `
                    <img src="${industry.image}" alt="${industry.name}" loading="lazy">
                    <div class="industry-label">${industry.name}</div>
                `;

    card.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    document.querySelector(".globe-container").appendChild(card);
    cards.push({ element: card, angle, radius: 4.5, speed: 0.004 });
  });
}

function createMobileGrid() {
  const mobileGrid = document.getElementById("mobile-grid");
  mobileGrid.style.display = "grid";

  industries.forEach((industry, index) => {
    const card = document.createElement("div");
    card.className = "industry-card";
    card.innerHTML = `
                    <img src="${industry.image}" alt="${industry.name}" loading="lazy">
                    <div class="industry-label">${industry.name}</div>
                `;
    mobileGrid.appendChild(card);

    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
      }
    );
  });
}

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 120 + "%";
    particle.style.top = Math.random() * 200 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particlesContainer.appendChild(particle);
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (globe) {
    globe.rotation.y += 0.005;
  }

  if (!isMobile && cards.length > 0) {
    cards.forEach((card, index) => {
      card.angle += card.speed;
      const x = Math.cos(card.angle) * card.radius;
      const y = Math.sin(card.angle) * card.radius;
      card.element.style.transform = `translate(${x * 80}px, ${y * 80}px)`;
    });
  }

  if (renderer) {
    renderer.render(scene, camera);
  }
}

function handleResize() {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== isMobile) {
    location.reload(); // Simple reload for layout change
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 500);
  }, 1500);

  initThreeJS();
  createParticles();
  animate();

  window.addEventListener("resize", handleResize);
});

//  JOIN US et FAQ SECTION
// Observe elements for animation
        const observerL = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

document.querySelectorAll(".content-left, .content-right").forEach((el) => {
  observerL.observe(el);
});

// FAQ Accordion Functionality
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.querySelector(".cta-button").addEventListener("click", (e) => {
e.preventDefault();
  window.location.href = "/join";
});
