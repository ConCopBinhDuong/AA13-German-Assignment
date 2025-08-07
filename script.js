// Smooth scrolling và animation effects
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling cho navigation links
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Thêm hiệu ứng ripple khi click
      createRipple(e, this);
    });
  });

  // Tạo hiệu ứng ripple
  function createRipple(event, element) {
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = element.querySelector(".ripple");
    if (ripple) {
      ripple.remove();
    }

    element.appendChild(circle);
  }

  // Intersection Observer cho animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe tất cả các elements cần animation
  const animatedElements = document.querySelectorAll(
    ".intro-card, .story-card, .conclusion-card, .character-card, .reason-card, .timeline-item"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Parallax effect cho hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });

  // Typing effect cho hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = function () {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 500);
  }

  // Hover effects cho images
  const images = document.querySelectorAll(
    ".movie-poster, .character-img, .recommendation-image"
  );
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    });
  });

  // Counter animation cho rating stars
  const stars = document.querySelectorAll(".star");
  if (stars.length > 0) {
    let delay = 0;
    stars.forEach((star) => {
      setTimeout(() => {
        star.style.animation = "starPop 0.6s ease";
      }, delay);
      delay += 200;
    });
  }

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 300 + 1000);

    // Initial state
    item.style.opacity = "0";
    item.style.transform = "translateX(-50px)";
    item.style.transition = "all 0.6s ease";
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    // Navbar background opacity based on scroll
    const opacity = Math.min(scrollTop / 200, 0.95);
    navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
  });

  // Floating animation cho nav icons
  const navIcons = document.querySelectorAll(
    ".nav-icon, .card-icon, .reason-icon"
  );
  navIcons.forEach((icon) => {
    setInterval(() => {
      icon.style.transform = "translateY(-5px)";
      setTimeout(() => {
        icon.style.transform = "translateY(0)";
      }, 500);
    }, 2000 + Math.random() * 2000);

    icon.style.transition = "transform 0.5s ease";
  });

  // Loading animation
  const body = document.body;
  body.style.opacity = "0";

  window.addEventListener("load", function () {
    body.style.transition = "opacity 0.5s ease";
    body.style.opacity = "1";
  });

  // Easter egg - Konami code
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      createConfetti();
      alert("🎉 Geheimcode entdeckt! Du bist ein echter Film-Fan! 🎬");
    }
  });

  // Confetti effect
  function createConfetti() {
    const colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.zIndex = "9999";
      confetti.style.borderRadius = "50%";
      confetti.style.animation = `confettiFall ${
        Math.random() * 3 + 2
      }s linear forwards`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }
});

// CSS Animations durch JavaScript
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes starPop {
        0% { transform: scale(0); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    }
`;

document.head.appendChild(style);
