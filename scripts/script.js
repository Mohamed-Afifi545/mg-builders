const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
const openBut = document.querySelector(".btn-mobile--open");
const closeBut = document.querySelector(".btn-mobile--close");
const mainNav = document.querySelector(".main-nav");
const navMenu = document.querySelector(".header");
const body = document.querySelector("body");
const navLink = document.querySelectorAll(".main-nav-link");

yearEl.textContent = currentYear;

function myFunction(x) {
  if (x.matches) {
    mainNav.classList.add("main-nav--transition");
  } else {
    mainNav.classList.remove("main-nav--transition");
    navMenu.classList.remove("nav-open");
    body.classList.remove("stop-scrolling");
  }
}
var x = window.matchMedia("(max-width: 944px)");

myFunction(x);

x.addEventListener("change", function () {
  myFunction(x);
});

openBut.addEventListener("click", function () {
  navMenu.classList.add("nav-open");
  body.classList.add("stop-scrolling");
});
closeBut.addEventListener("click", function () {
  navMenu.classList.remove("nav-open");
  body.classList.remove("stop-scrolling");
});

navLink.forEach((link) => {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("nav-open")) {
      body.classList.remove("stop-scrolling");
      navMenu.classList.remove("nav-open");
    }
  });
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    if (href === "#") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();

      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

// .no-flexbox-gap .main-nav-list li:not(:last-child) {
//   margin-right: 4.8rem;
// }

// .no-flexbox-gap .list-item:not(:last-child) {
//   margin-bottom: 1.6rem;
// }

// .no-flexbox-gap .list-icon:not(:last-child) {
//   margin-right: 1.6rem;
// }

// .no-flexbox-gap .delivered-faces {
//   margin-right: 1.6rem;
// }

// .no-flexbox-gap .meal-attribute:not(:last-child) {
//   margin-bottom: 2rem;
// }

// .no-flexbox-gap .meal-icon {
//   margin-right: 1.6rem;
// }

// .no-flexbox-gap .footer-row div:not(:last-child) {
//   margin-right: 6.4rem;
// }

// .no-flexbox-gap .social-links li:not(:last-child) {
//   margin-right: 2.4rem;
// }

// .no-flexbox-gap .footer-nav li:not(:last-child) {
//   margin-bottom: 2.4rem;
// }

// @media (max-width: 75em) {
//   .no-flexbox-gap .main-nav-list li:not(:last-child) {
//     margin-right: 3.2rem;
//   }
// }

// @media (max-width: 59em) {
//   .no-flexbox-gap .main-nav-list li:not(:last-child) {
//     margin-right: 0;
//     margin-bottom: 4.8rem;
//   }
// }

///////////////////////////////////////////////////

// slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `
    <button class="dots__dot" data-slide="${i}"  aria-label="dot-${i}"></button>
    `
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

//next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

//previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    curSlide = parseInt(slide, 10);
    activateDot(slide);
  }
});

//go to top when refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
////////////////////////

// Variables to store the starting points
let startX = 0;
let startY = 0;

// Function to get the touch start coordinates
function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  startX = firstTouch.clientX;
  startY = firstTouch.clientY;
}

// Function to handle the end of the touch
function handleTouchMove(event) {
  if (!startX || !startY) {
    return;
  }

  let endX = event.touches[0].clientX;
  let endY = event.touches[0].clientY;

  let diffX = startX - endX;
  let diffY = startY - endY;

  // Check if the swipe is more horizontal than vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  // Reset values
  startX = 0;
  startY = 0;
}

// Add event listeners to the desired element
const slider = document.querySelector(".slider");
slider.addEventListener("touchstart", handleTouchStart, false, {
  passive: true,
});
slider.addEventListener("touchmove", handleTouchMove, false, { passive: true });

///////////////////////
////////////////
////////////////
////////////////

// Collapsible sections
document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".collapsible-toggle");
  const contents = document.querySelectorAll(".collapsible-content");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      contents.forEach((content) => {
        if (content !== targetContent) {
          content.classList.remove("show");
        }
      });
      targetContent.classList.toggle("show");
    });
  });
});

// Smooth scrolling to sections
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const steps = document.querySelectorAll(".step-text-box, .step-img-box");

  const observer = new IntersectionObserver(
    (entries) => {
      // Add or remove the "visible" class to the sections and steps when they are intersecting the viewport or not.
      entries.forEach((entry) => {
        // Add or remove the "visible" class to the steps when they are intersecting the viewport.
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  steps.forEach((step) => {
    observer.observe(step);
  });
  sections.forEach((section) => {
    observer.observe(section);
  });
});
