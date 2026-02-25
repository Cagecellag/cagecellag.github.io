const btn = document.getElementById("load-ppt");
const container = document.getElementById("ppt-container");

btn.addEventListener("click", () => {


const isActive = btn.classList.toggle("active");

if (isActive) {
    container.innerHTML = `
        <iframe 
        src="https://1drv.ms/p/c/7e906219fa19eb95/IQQYKa1E75O7TZ6j1z7Astv-AZjy4f_2CUw3OpgtOHm07Wk" 
        class="bombay-embed"
        loading="lazy"
        title="Presentation">
        </iframe>
    `;
  } else {
    container.innerHTML = "";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // chiptune player setup
  const player = ChiptuneJsPlayer.loadFile("/0scr/Media/song.xm"); // replace with your file
  const playBtn = document.getElementById("play-btn");
  const stopBtn = document.getElementById("stop-btn");

  playBtn.addEventListener("click", () => {
    player.play();
  });

});
