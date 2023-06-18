const observerOptions = {
  threshold: 0.5,
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

const statistic = document
  .querySelectorAll(".static-heathcare")
  .forEach((static) => {
    createIntersectionObserver(static, (target) => {
      const targetValue = parseInt(target.dataset.value, 10);
      animateValue(target, 0, targetValue, 1000);
    });
  });

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString().replace(/\./g, ",");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
