window['libopenmpt'] = {};
    libopenmpt.locateFile = function (filename) {
      return "//cdn.jsdelivr.net/gh/deskjet/chiptune2.js@master/" + filename;
    };
    libopenmpt.onRuntimeInitialized = function () {
      var player;

      function init() {
        if (player == undefined) {
          player = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));
        }
        else {
          player.stop();
          playPauseButton();
        }
      }

      function setMetadata(path) {
        var metadata = player.metadata();
        var filename = path.name || path.split('/').pop() || path;
        document.getElementById('filename').innerHTML = filename;
        if (metadata['title'] != '') {
          document.getElementById('title').innerHTML = metadata['title'];
        }
        else {
          document.getElementById('title').innerHTML = '';
        }

        if (metadata['artist'] != '') {
          document.getElementById('artist').innerHTML = '<br />' + metadata['artist'];
        }
        else {
          document.getElementById('artist').innerHTML = '';
        }
      }

      function afterLoad(path, buffer) {
        document.querySelectorAll('#pitch,#tempo,#volume').forEach(e => e.value = 1);
        player.play(buffer);
        setMetadata(path);

        // Setup seekbar
        var seekbar = document.getElementById('seekbar');
        var timeDisplay = document.getElementById('time-display');
        seekbar.max = player.duration();
        seekbar.value = 0;
        

        function formatTime(seconds) {
          var min = Math.floor(seconds / 60);
          var sec = Math.floor(seconds % 60);
          return min + ':' + (sec < 10 ? '0' : '') + sec;
        }

        const slider = document.querySelector("#seekbar");

        function updateSeekbar() {
          if (player.currentPlayingNode) {
            var current = player.getCurrentTime();
            var total = player.duration();
            seekbar.value = current;
            timeDisplay.textContent = formatTime(current) + '/' + formatTime(total);
            
            
            const percent = (current / total) * 100;
            seekbar.style.setProperty("--progress", percent + "%");
          }
        }

        slider.addEventListener("input", () => {
          const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
          slider.style.setProperty("--progress", percent + "%");
        });

        var updateInterval = setInterval(updateSeekbar, 30);

        seekbar.addEventListener('mousedown', function() {
          clearInterval(updateInterval);
        });

        seekbar.addEventListener('change', function(e) {
          player.seekTo(parseFloat(e.target.value));
          updateInterval = setInterval(updateSeekbar, 100);
        });

        pausePauseButton();
      }

      function loadURL(path) {
        init();
        player.load(path, afterLoad.bind(this, path));
      }

      function pauseButton() {
        player.togglePause();
        switchPauseButton();
      }

      function switchPauseButton() {
        var button = document.getElementById('pause')
        if (button) {
          button.id = "play_tmp";
        }
        button = document.getElementById('play')
        if (button) {
          button.id = "pause";
        }
        button = document.getElementById('play_tmp')
        if (button) {
          button.id = "play";
        }
      }

      function playPauseButton() {
        var button = document.getElementById('pause')
        if (button) {
          button.id = "play";
        }
      }

      function pausePauseButton() {
        var button = document.getElementById('play')
        if (button) {
          button.id = "pause";
        }
      }

      

      var fileaccess = document.querySelector('*');
      fileaccess.ondrop = function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        init();

        player.load(file, afterLoad.bind(this, path));
      }

      fileaccess.ondragenter = function (e) { e.preventDefault(); }
      fileaccess.ondragover = function (e) { e.preventDefault(); }

      document.querySelectorAll('.song').forEach(function (e) {
        e.addEventListener('click', function (evt) {
          modurl = evt.target.getAttribute("data-modurl");
          loadURL(modurl);
        }, false);
      });

      document.querySelector('input[name=files]').addEventListener('change', function (evt) {
        loadURL(evt.target.files[0]);
      });

      document.querySelector('input[name=submiturl]').addEventListener('click', function () {
        var exturl = document.querySelector('input[name=exturl]');
        modurl = exturl.value;
        loadURL(modurl);
        exturl.value = null;
      });

      document.querySelector('#play').addEventListener('click', pauseButton, false);

      document.querySelector('#pitch').addEventListener('input', function (e) {
        player.module_ctl_set('play.pitch_factor', e.target.value.toString());
      }, false);

      document.querySelector('#tempo').addEventListener('input', function (e) {
        player.module_ctl_set('play.tempo_factor', e.target.value.toString());
      }, false);

      document.querySelector('#volume').addEventListener('input', function (e) {
        player.setVolume(parseFloat(e.target.value));
      }, false);

    
    };