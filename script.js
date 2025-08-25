// Fullscreen + Animation Trigger
const btn = document.getElementById("fullscreenBtn");

btn.addEventListener("click", async () => {
  // Request Fullscreen
  if (document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    await document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    await document.documentElement.msRequestFullscreen();
  }

  // Hide Button
  btn.style.display = "none";

  // Trigger the intro animation
  startIntroAnimation();
});

// Intro Animation Function
function startIntroAnimation() {
  const message = "Stand by...";
  const textContainer = document.getElementById("text");
  const fastInterval = 250;
  const slowInterval = 550;
  let delay = 3.5;

  // Create character spans
  message.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("char");
    textContainer.appendChild(span);

    if (i < 8) {
      setTimeout(() => span.classList.add("show"), delay);
      delay += fastInterval;
    } else {
      delay += slowInterval;
      setTimeout(() => span.classList.add("show"), delay);
    }
  });

  // Erase animation
  const eraseStartDelay = delay + 800;
  setTimeout(() => {
    const spans = document.querySelectorAll(".char");
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.style.opacity = "0";
      }, i * 100);
    });
  }, eraseStartDelay);

  // Wipe animation
  const wipeStartDelay = eraseStartDelay + message.length * 100 + 500;
  setTimeout(() => {
    document.getElementById("wipe").style.width = "100%";
  }, wipeStartDelay);

  // Show portfolio and navbar
  const portfolioShowDelay = wipeStartDelay + 2000;
  setTimeout(() => {
    document.getElementById("portfolio").classList.add("show");
    document.getElementById("navbar").classList.add("show");
  }, portfolioShowDelay);

  // Unlock scroll
  setTimeout(() => {
    document.body.classList.remove("lock-scroll");
  }, 8060);

  // Clone logos for infinite scroll
  const copy = document.querySelector(".logos-slide").cloneNode(true);
  document.querySelector(".logos").appendChild(copy);
}
