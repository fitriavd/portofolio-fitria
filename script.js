// ================================================
// Portfolio Website - Fitria Vuspita Dewi
// JavaScript Functionality
// ================================================

// Global Variables
let isLoading = true;
let currentFilter = "all";
let animationObserver;

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initializeScrollDownIndicator();
});
// ================================================
// Scroll Down Indicator (Hero)
// ================================================
function initializeScrollDownIndicator() {
  const scrollIndicator = document.getElementById("scroll-indicator");
  const nextSection = document.getElementById("about");
  if (scrollIndicator && nextSection) {
    scrollIndicator.addEventListener("click", function () {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    scrollIndicator.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

// Initialize App
function initializeApp() {
  // Show loading screen
  showLoadingScreen();

  // Initialize all components after content loads
  setTimeout(() => {
    hideLoadingScreen();
    initializeNavigation();
    initializeScrollEffects();
    initializeTypingAnimation();
    initializeCounterAnimation();
    initializeSkillBars();
    initializeProjectFiltering();
    initializeLoadMoreProjects();
    initializeContactForm();
    initializeScrollToTop();
    initializeParallaxEffects();
    initializeLazyLoading();
    initializeTooltips();
  }, 2000);
}

// ================================================
// Loading Screen
// ================================================
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.remove("hidden");
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
  isLoading = false;
}

// ================================================
// Navigation
// ================================================
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });
  }

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active navigation link
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ================================================
// Scroll Effects & Animations
// ================================================
function initializeScrollEffects() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Trigger specific animations
        if (entry.target.classList.contains("stat-card")) {
          animateCounter(entry.target);
        }
        if (entry.target.classList.contains("skill-card")) {
          animateSkillBar(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements with animation attributes
  const animatedElements = document.querySelectorAll("[data-aos], .stat-card, .skill-card");
  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
}

// ================================================
// Typing Animation
// ================================================
function initializeTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const originalText = typingElement.textContent;
  const words = ["Fitria Vuspita Dewi", "Frontend Developer", "UI/UX Designer", "Creative Coder"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing animation after a delay
  setTimeout(type, 1000);
}

// ================================================
// Counter Animation
// ================================================
function initializeCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    counter.dataset.animated = "false";
  });
}

function animateCounter(card) {
  const counter = card.querySelector("[data-count]");
  if (!counter || counter.dataset.animated === "true") return;

  const target = parseInt(counter.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  counter.dataset.animated = "true";

  const updateCounter = () => {
    current += step;
    if (current >= target) {
      counter.textContent = target + "+";
    } else {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
}

// ================================================
// Skills Bar Animation
// ================================================
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  skillBars.forEach((bar) => {
    bar.dataset.animated = "false";
  });
}

function animateSkillBar(card) {
  const skillBar = card.querySelector(".skill-bar");
  if (!skillBar || skillBar.dataset.animated === "true") return;

  const level = skillBar.dataset.level;
  skillBar.dataset.animated = "true";

  setTimeout(() => {
    skillBar.style.width = level + "%";
  }, 300);
}

// ================================================
// Project Filtering
// ================================================
function initializeProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter projects
      filterProjects(filter, projectCards);
      currentFilter = filter;
    });
  });
}

function filterProjects(filter, cards) {
  cards.forEach((card) => {
    const shouldShow = filter === "all" || card.classList.contains(filter);

    if (shouldShow) {
      card.style.display = "block";
      setTimeout(() => {
        card.classList.remove("hidden");
      }, 100);
    } else {
      card.classList.add("hidden");
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

// ================================================
// Load More Projects
// ================================================
function initializeLoadMoreProjects() {
  const loadMoreBtn = document.getElementById("loadMoreProjects");
  const hiddenProjects = document.querySelectorAll(".hidden-project");
  let isExpanded = false;

  if (!loadMoreBtn || hiddenProjects.length === 0) return;

  // Initially hide additional projects
  hiddenProjects.forEach((project) => {
    project.style.display = "none";
  });

  loadMoreBtn.addEventListener("click", () => {
    const loadMoreText = loadMoreBtn.querySelector(".load-more-text");
    const loadLessText = loadMoreBtn.querySelector(".load-less-text");
    const icon = loadMoreBtn.querySelector("i");

    if (!isExpanded) {
      // Show more projects
      hiddenProjects.forEach((project, index) => {
        setTimeout(() => {
          project.style.display = "block";
          project.classList.add("fade-in");
        }, index * 100);
      });

      // Update button
      loadMoreText.style.display = "none";
      loadLessText.style.display = "inline";
      icon.className = "fas fa-minus";
      isExpanded = true;
    } else {
      // Hide additional projects
      hiddenProjects.forEach((project, index) => {
        setTimeout(() => {
          project.classList.remove("fade-in");
          project.style.display = "none";
        }, index * 50);
      });

      // Update button
      loadMoreText.style.display = "inline";
      loadLessText.style.display = "none";
      icon.className = "fas fa-plus";
      isExpanded = false;

      // Scroll to projects section
      document.getElementById("projects").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// ================================================
// Contact Form
// ================================================
function initializeContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, select, textarea");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  // Form submission
  form.addEventListener("submit", handleFormSubmission);

  // Custom checkbox styling
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateCheckboxStyle);
  });
}

function validateField(field) {
  const errorElement = field.parentNode.querySelector(".form-error");
  let isValid = true;
  let errorMessage = "";

  // Reset previous state
  field.classList.remove("error");
  if (errorElement) errorElement.style.display = "none";

  // Validation rules
  if (field.hasAttribute("required") && !field.value.trim()) {
    isValid = false;
    errorMessage = "This field is required";
  } else if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Show error if invalid
  if (!isValid) {
    field.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    }
  }

  return isValid;
}

function clearFieldError(field) {
  field.classList.remove("error");
  const errorElement = field.parentNode.querySelector(".form-error");
  if (errorElement) errorElement.style.display = "none";
}

function handleFormSubmission(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll("input, select, textarea");

  // Validate all fields
  let isFormValid = true;
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    showNotification("Please fix the errors below", "error");
    return;
  }

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    // Show success message
    showNotification("Message sent successfully! I'll get back to you soon.", "success");

    // Reset form
    form.reset();
    updateCheckboxStyle.call(form.querySelector('input[type="checkbox"]'));
  }, 3000);
}

function updateCheckboxStyle() {
  const checkmark = this.parentNode.querySelector(".checkmark");
  if (checkmark) {
    checkmark.classList.toggle("checked", this.checked);
  }
}

// ================================================
// Scroll to Top
// ================================================
function initializeScrollToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ================================================
// Parallax Effects
// ================================================
function initializeParallaxEffects() {
  const floatingElements = document.querySelectorAll(".floating-element");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// ================================================
// Lazy Loading
// ================================================
function initializeLazyLoading() {
  const lazyElements = document.querySelectorAll("[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.src = element.dataset.src;
        element.classList.remove("lazy");
        imageObserver.unobserve(element);
      }
    });
  });

  lazyElements.forEach((element) => imageObserver.observe(element));
}

// ================================================
// Tooltips
// ================================================
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    let tooltipTimeout;

    element.addEventListener("mouseenter", (e) => {
      tooltipTimeout = setTimeout(() => {
        showTooltip(e.target, e.target.dataset.tooltip);
      }, 500);
    });

    element.addEventListener("mouseleave", () => {
      clearTimeout(tooltipTimeout);
      hideTooltip();
    });
  });
}

function showTooltip(element, text) {
  const existingTooltip = document.querySelector(".custom-tooltip");
  if (existingTooltip) existingTooltip.remove();

  const tooltip = document.createElement("div");
  tooltip.className = "custom-tooltip";
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";
}

function hideTooltip() {
  const tooltip = document.querySelector(".custom-tooltip");
  if (tooltip) tooltip.remove();
}

// ================================================
// Utility Functions
// ================================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any additional scroll-based functionality here
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Theme switcher (bonus feature)
function initializeThemeswitcher() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.title = "Toggle theme";

  themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: var(--text-white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Performance monitoring
function initializePerformanceMonitoring() {
  // Page load performance
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });

  // Memory usage (if supported)
  if ("memory" in performance) {
    setInterval(() => {
      const memory = performance.memory;
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
        console.warn("High memory usage detected");
      }
    }, 10000);
  }
}

// Error handling
window.addEventListener("error", (event) => {
  console.error("JavaScript Error:", event.error);
  // In production, you might want to send this to an error tracking service
});

// Initialize bonus features
document.addEventListener("DOMContentLoaded", () => {
  initializeThemeswitcher();
  initializePerformanceMonitoring();
});

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Analytics integration placeholder
function trackEvent(eventName, eventData) {
  // Google Analytics or other analytics integration
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData);
  }
  console.log("Event tracked:", eventName, eventData);
}

// Track user interactions
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn, .nav-link, .social-link")) {
    trackEvent("click", {
      element_type: e.target.className,
      element_text: e.target.textContent.trim(),
    });
  }
});

// Export functions for potential module usage
window.PortfolioApp = {
  showNotification,
  trackEvent,
  filterProjects,
  animateCounter,
  animateSkillBar,
};

// Console styling (fun easter egg)
console.log("%c👋 Hello there! 🎨", "color: #667eea; font-size: 20px; font-weight: bold;");
console.log("%cInterested in the code? Check out the repository!", "color: #764ba2; font-size: 14px;");
console.log("%c🚀 Built with love by Fitria Vuspita Dewi", "color: #f093fb; font-size: 12px;");
