let messages = [];
let shuffledMessageIndices = [];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

fetch('messages.json')
  .then(response => response.json())
  .then(data => {
    messages = data.messages;
    const extendedMessages = [];
    // Đảm bảo mỗi tin nhắn xuất hiện ít nhất 2 lần
    for (let i = 0; i < 2; i++) {
      extendedMessages.push(...messages.map((_, idx) => idx));
    }
    // Lấp đầy các vị trí còn lại bằng các tin nhắn ngẫu nhiên
    const remainingSlots = 25 - extendedMessages.length;
    for (let i = 0; i < remainingSlots; i++) {
      extendedMessages.push(Math.floor(Math.random() * messages.length));
    }
    shuffledMessageIndices = shuffleArray(extendedMessages);
    createLanterns();
  })
  .catch(error => {
    console.error('Lỗi tải messages:', error);
    // Fallback messages
    messages = [
      "💌 Gửi em, ánh trăng này là của chúng ta, Trung Thu này anh chỉ mong em luôn vui vẻ, hạnh phúc bên anh mãi mãi 💕",
      "🌙 Em yêu, anh nhớ em lắm! Mong rằng năm nay chúng ta sẽ cùng nhau ngắm trăng và tạo thêm nhiều kỷ niệm đẹp 💖"
    ];
    const extendedMessages = [];
    for (let i = 0; i < 2; i++) {
      extendedMessages.push(...messages.map((_, idx) => idx));
    }
    const remainingSlots = 25 - extendedMessages.length;
    for (let i = 0; i < remainingSlots; i++) {
      extendedMessages.push(Math.floor(Math.random() * messages.length));
    }
    shuffledMessageIndices = shuffleArray(extendedMessages);
    createLanterns();
  });

function createLanterns() {
  const screenWidth = window.innerWidth;
  let lanternCount = 25; // Desktop

  if (screenWidth <= 320) {
    lanternCount = 8;
  } else if (screenWidth <= 480) {
    lanternCount = 12;
  } else if (screenWidth <= 768) {
    lanternCount = 16;
  }

  for (let i = 0; i < lanternCount; i++) {
    let lantern = document.createElement("div");
    lantern.className = "lantern";

    lantern.style.left = Math.random() * 85 + "vw";
    lantern.style.animationDuration = (15 + Math.random() * 20) + "s";
    lantern.style.animationDelay = Math.random() * 12 + "s";
    lantern.style.animationTimingFunction = "ease-out";

    let lanternFrame = document.createElement("div");
    lanternFrame.className = "lantern-frame";

    let lanternBody = document.createElement("div");
    lanternBody.className = "lantern-body";

    let pattern = document.createElement("div");
    pattern.className = "pattern";
    lanternBody.appendChild(pattern);

    let lanternTassel = document.createElement("div");
    lanternTassel.className = "lantern-tassel";

    lantern.appendChild(lanternFrame);
    lantern.appendChild(lanternBody);
    lantern.appendChild(lanternTassel);

    const messageIndex = shuffledMessageIndices[i % shuffledMessageIndices.length];
    lantern.onclick = () => showLanternMessage(lantern, messages[messageIndex]);

    document.body.appendChild(lantern);
  }
}

function showLanternMessage(lantern, messageContent) {
  lantern.classList.add('clicked');
  lantern.style.animationPlayState = 'paused';
  lantern.style.transform = 'scale(1.1)';
  lantern.style.filter = 'drop-shadow(0 0 50px rgba(255,150,0,1)) brightness(1.3)';
  lantern.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  let shakeCount = 0;
  const shakeInterval = setInterval(() => {
    const isEven = shakeCount % 2 === 0;
    lantern.style.transform = isEven ? 'scale(1.1) rotate(2deg)' : 'scale(1.1) rotate(-2deg)';
    shakeCount++;
    if (shakeCount >= 4) {
      clearInterval(shakeInterval);
      lantern.style.transform = 'scale(1)';
      showMessage(messageContent);
    }
  }, 60);
}

function showMessage(messageContent) {
  const messageContainer = document.getElementById('messageContainer');
  const messageContentDiv = document.getElementById('messageContent');

  messageContainer.style.display = 'block';
  messageContentDiv.innerHTML = messageContent;

  playSound();
}

function hideMessage() {
  const lanterns = document.querySelectorAll('.lantern.clicked');
  lanterns.forEach(lantern => {
    lantern.classList.remove('clicked');
    lantern.style.transform = '';
    lantern.style.filter = '';
    lantern.style.animationPlayState = 'running';
  });

  document.getElementById('messageContainer').style.display = 'none';
}

function playSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Không thể phát âm thanh:', error.message);
  }
}

function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;
  for (let i = 0; i < 100; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

// Gán sự kiện sau khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.onclick = hideMessage;
    }

    const messageBox = document.getElementById('message');
    if (messageBox) {
        messageBox.onclick = function(event) {
            event.stopPropagation();
        };
    }

    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.onclick = hideMessage;
    }
});

// Tạo sao sau khi trang đã tải hoàn toàn
window.addEventListener('load', createStars);