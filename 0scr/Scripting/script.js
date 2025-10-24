document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const overlay2 = document.getElementById("overlay2");

  // Sidebar open / close
  openBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });

  // Initial fade-in when the page loads
  setTimeout(() => {
    overlay2.classList.remove("active");
  }, 100);

  // Handle Safari and other browsers restoring from cache (bfcache)
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Page was restored from cache → reset overlays
      overlay.classList.remove("active");
      overlay2.classList.remove("active");

      // Optional: trigger a short fade-in reset if needed
      requestAnimationFrame(() => {
        overlay2.style.display = "";
      });
    }
  });

  // Smooth transition when clicking sidebar links
  window.transitionPage = function (e) {
    e.preventDefault();
    const target = e.target.href;

    // Close sidebar if open
    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
    }

    // Trigger fade-out overlay
    overlay.classList.add("active");

    // Wait for fade, then navigate
    setTimeout(() => {
      window.location.href = target;
    }, 600); // matches CSS transition duration
  };
});