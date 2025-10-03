document.addEventListener('DOMContentLoaded', function() {
  const backgroundMusic = document.getElementById('backgroundMusic');

  function playBackgroundMusic() {
    if (backgroundMusic) {
      const savedTime = sessionStorage.getItem('audioCurrentTime');
      const savedVolume = sessionStorage.getItem('audioVolume');

      if (savedVolume) {
        backgroundMusic.volume = parseFloat(savedVolume);
      } else {
        backgroundMusic.volume = 0.4;
      }

      backgroundMusic.play().then(() => {
        if (savedTime) {
          backgroundMusic.currentTime = parseFloat(savedTime);
        }
      }).catch(e => {
        console.log('Không thể phát nhạc nền:', e.message);
      });
    }
  }

  playBackgroundMusic();

  // Bắt đầu phát nhạc khi người dùng tương tác lần đầu
  document.addEventListener('click', playBackgroundMusic, { once: true });
  document.addEventListener('touchstart', playBackgroundMusic, { once: true });

  function saveAudioState() {
    if (backgroundMusic) {
      sessionStorage.setItem('audioCurrentTime', backgroundMusic.currentTime.toString());
      sessionStorage.setItem('audioVolume', backgroundMusic.volume.toString());
    }
  }

  // Lưu trạng thái nhạc định kỳ và trước khi rời trang
  setInterval(saveAudioState, 1000);
  window.addEventListener('beforeunload', saveAudioState);
});