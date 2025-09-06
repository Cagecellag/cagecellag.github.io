document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");


  openBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });


window.transitionPage = function (e) {
    e.preventDefault();
    const target = e.target.href;

    // Close sidebar if open
    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
    }

    // Trigger fade
    overlay.classList.add("active");

    // Wait for overlay fade, then redirect
    setTimeout(() => {
      window.location.href = target;
    }, 600);
  };
});
