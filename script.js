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

  var magnetStrength = 0.25;
  var magnetMax = 8;

  document.querySelectorAll(".pill").forEach(function (pill) {
    var pillTicking = false;
    var pendingEvent = null;

    pill.addEventListener("mousemove", function (event) {
      pendingEvent = event;
      if (pillTicking) return;
      pillTicking = true;

      requestAnimationFrame(function () {
        var rect = pill.getBoundingClientRect();
        var relX = pendingEvent.clientX - rect.left - rect.width / 2;
        var relY = pendingEvent.clientY - rect.top - rect.height / 2;

        var dx = Math.max(-magnetMax, Math.min(magnetMax, relX * magnetStrength));
        var dy = Math.max(-magnetMax, Math.min(magnetMax, relY * magnetStrength));

        pill.style.transform =
          "translate(" + dx.toFixed(1) + "px, " + (dy - 4).toFixed(1) + "px) scale(1.05)";

        pillTicking = false;
      });
    });

    pill.addEventListener("mouseleave", function () {
      pill.style.transform = "";
    });
  });
})();
