(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var root = document.documentElement;
  var maxOffset = 40;
  var ticking = false;

  window.addEventListener("mousemove", function (event) {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      var xRatio = event.clientX / window.innerWidth - 0.5;
      var yRatio = event.clientY / window.innerHeight - 0.5;

      root.style.setProperty("--mx", (xRatio * maxOffset * 2).toFixed(1));
      root.style.setProperty("--my", (yRatio * maxOffset * 2).toFixed(1));

      ticking = false;
    });
  });
})();
