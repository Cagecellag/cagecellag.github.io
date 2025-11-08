const btn = document.getElementById("load-ppt");
const container = document.getElementById("ppt-container");
let loaded = false;

btn.addEventListener("click", () => {
  if (!loaded) {
    container.innerHTML = `
    <iframe 
        id="Bombay_PPP" 
        src="https://1drv.ms/p/c/7e906219fa19eb95/IQQYKa1E75O7TZ6j1z7Astv-AZjy4f_2CUw3OpgtOHm07Wk" 
        frameborder="0" scrolling="no">
    </iframe>`;
    btn.textContent = "Unload presentation";
    loaded = true;
  } else {
    container.innerHTML = ""; // clears and collapses space
    btn.textContent = "Load presentation";
    loaded = false;
  }
});