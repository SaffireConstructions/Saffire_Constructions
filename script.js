const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const dropdown = document.querySelector("[data-dropdown]");
const dropdownTrigger = document.querySelector("[data-dropdown-trigger]");
const slides = [...document.querySelectorAll("[data-slide-panel]")];
const slideButtons = [...document.querySelectorAll("[data-slide]")];
const revealEls = [...document.querySelectorAll(".reveal")];
const leadForms = [...document.querySelectorAll("[data-lead-form]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxDescription = document.querySelector("[data-lightbox-description]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const supportsTransparentHeader = Boolean(document.querySelector(".hero, .page-hero, .split-hero"));

let currentSlide = 0;

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
  header.classList.toggle("is-top", supportsTransparentHeader && window.scrollY <= 20);
}

function setSlide(index) {
  currentSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  slideButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === index);
  });
}

function updateParallax() {
  const offset = Math.min(window.scrollY * 0.16, 90);
  document.querySelectorAll(".hero-slide img, .page-hero img, .split-hero img").forEach((image) => {
    image.style.setProperty("--parallax", `${offset}px`);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
}

if (dropdownTrigger && dropdown) {
  dropdownTrigger.addEventListener("click", () => {
    dropdown.classList.toggle("is-open");
  });
}

slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSlide(Number(button.dataset.slide));
  });
});

if (slides.length > 1) {
  setInterval(() => {
    setSlide((currentSlide + 1) % slides.length);
  }, 5600);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((element) => revealObserver.observe(element));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    projectCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!lightbox) return;
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
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Enquiry Sent";
    button.disabled = true;

    setTimeout(() => {
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 2200);
  });
});

window.addEventListener("scroll", () => {
  setHeaderState();
  updateParallax();
});

setHeaderState();
updateParallax();


document.addEventListener("DOMContentLoaded", () => {
  const openEnquiry = document.getElementById("openEnquiry");
  const closeEnquiry = document.getElementById("closeEnquiry");
  const enquiryPopup = document.getElementById("enquiryPopup");

  if (openEnquiry && enquiryPopup) {
    openEnquiry.addEventListener("click", () => {
      enquiryPopup.classList.add("is-open");
    });
  }

  if (closeEnquiry && enquiryPopup) {
    closeEnquiry.addEventListener("click", () => {
      enquiryPopup.classList.remove("is-open");
    });
  }

  if (enquiryPopup) {
    enquiryPopup.addEventListener("click", (event) => {
      if (event.target === enquiryPopup) {
        enquiryPopup.classList.remove("is-open");
      }
    });
  }
});