//intersection observer
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

function createIntersectionObserver(target, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(target);
}

const headerContent = document.querySelector(".header-content__info");
const about = document.querySelector(".about");
const health = document.querySelector(".health-content");
const search = document.querySelector(".search");

const sections = [
  { item: headerContent, class: "animate-slide__bottom" },
  { item: about, class: "animate-slide__top" },
  { item: health, class: "animate-slide__right" },
  { item: search, class: "animate-slide__right-s" },
];

//individual sections animations
sections.forEach((item) => {
  createIntersectionObserver(item.item, (target) => {
    target.classList.add(item.class);
  });
});

// group sections animations
document.querySelectorAll(".project").forEach((project, index) => {
  createIntersectionObserver(project, (target) => {
    setTimeout(() => {
      target.classList.add("animate-slide__right");
    }, index * 500);
  });
});
document.querySelectorAll(".feed").forEach((project, index) => {
  createIntersectionObserver(project, (target) => {
    setTimeout(() => {
      target.classList.add("animate-slide__bottom");
    }, index * 500);
  });
});
document.querySelectorAll(".team-member").forEach((project, index) => {
  createIntersectionObserver(project, (target) => {
    setTimeout(() => {
      target.classList.add("animate-slide__top");
    }, index * 500);
  });
});
document.querySelectorAll(".static").forEach((project, index) => {
  createIntersectionObserver(project, (target) => {
    setTimeout(() => {
      target.classList.add("animate-slide__bottom");
    }, index * 200);
  });
});

document.querySelectorAll(".static-heathcare").forEach((static) => {
  createIntersectionObserver(static, (target) => {
    const targetValue = parseInt(target.dataset.value, 10);
    animateValue(target, 0, targetValue, 2000);
  });
});


//statistics animation
function animateValue(element, start, end, duration) {
  const options = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    const formattedValue = end === 2500 ? "+" + value.toLocaleString(undefined, options) : value.toLocaleString(undefined, options);

    element.textContent = formattedValue.replace(/\./g, ",");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
