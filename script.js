document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  const slides = document.querySelectorAll("[data-slide-panel]");
  const slideButtons = document.querySelectorAll("[data-slide]");
  const revealElements = document.querySelectorAll(".reveal");
  const leadForms = document.querySelectorAll("[data-lead-form]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-card]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxTitle = document.querySelector("[data-lightbox-title]");
  const lightboxDescription = document.querySelector("[data-lightbox-description]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");

  function setHeaderState() {
    if (!header) return;

    const supportsTransparentHeader = Boolean(
      document.querySelector(".hero, .page-hero, .split-hero")
    );

    header.classList.toggle("is-scrolled", window.scrollY > 20);
    header.classList.toggle("is-top", supportsTransparentHeader && window.scrollY <= 20);
  }

  function updateParallax() {
    const offset = Math.min(window.scrollY * 0.16, 90);

    document
      .querySelectorAll(".hero-slide img, .page-hero img, .split-hero img")
      .forEach(function (image) {
        image.style.setProperty("--parallax", offset + "px");
      });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");

      if (header) {
        header.classList.toggle("is-open", isOpen);
      }

      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.matches("a")) {
        nav.classList.remove("is-open");

        if (header) {
          header.classList.remove("is-open");
        }

        document.body.classList.remove("menu-open");
      }
    });
  }

  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector("[data-dropdown-trigger]");

    if (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("is-open");
      });
    }
  });

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = index;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    slideButtons.forEach(function (button, buttonIndex) {
      button.classList.toggle("is-active", buttonIndex === index);
    });
  }

  slideButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showSlide(Number(button.dataset.slide));
    });
  });

  if (slides.length > 1) {
    setInterval(function () {
      showSlide((currentSlide + 1) % slides.length);
    }, 5600);
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");

      projectCards.forEach(function (card) {
        const isVisible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !isVisible);
      });
    });
  });

  projectCards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

      const image = card.querySelector("img");

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = card.dataset.title;
      lightboxDescription.textContent = card.dataset.description;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();

      const enquiryPopup = document.getElementById("enquiryPopup");
      if (enquiryPopup) {
        enquiryPopup.classList.remove("is-open");
      }
    }
  });

  leadForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const button = form.querySelector("button");
      if (!button) return;

      const originalText = button.textContent;
      button.textContent = "Enquiry Sent";
      button.disabled = true;

      setTimeout(function () {
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 2200);
    });
  });

  const openEnquiry = document.getElementById("openEnquiry");
  const closeEnquiry = document.getElementById("closeEnquiry");
  const enquiryPopup = document.getElementById("enquiryPopup");

  if (openEnquiry && enquiryPopup) {
    openEnquiry.addEventListener("click", function () {
      enquiryPopup.classList.add("is-open");
    });
  }

  if (closeEnquiry && enquiryPopup) {
    closeEnquiry.addEventListener("click", function () {
      enquiryPopup.classList.remove("is-open");
    });
  }

  if (enquiryPopup) {
    enquiryPopup.addEventListener("click", function (event) {
      if (event.target === enquiryPopup) {
        enquiryPopup.classList.remove("is-open");
      }
    });
  }

  window.addEventListener("scroll", function () {
    setHeaderState();
    updateParallax();
  });

  setHeaderState();
  updateParallax();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});