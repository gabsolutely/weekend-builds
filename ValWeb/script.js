// password for login
const PASSWORD = "valentines";

// screen elements
const letterScreen = document.getElementById("letterScreen");
const loginScreen = document.getElementById("loginScreen");
const valentineScreen = document.getElementById("valentineScreen");
const yesScreen = document.getElementById("yesScreen");

// interactive elements
const envelope = document.querySelector(".envelope");
const openLetterBtn = document.getElementById("openLetterBtn");

const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const questionEl = document.getElementById("question");

// button elements
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const finalGif = document.getElementById("finalGif");

// game state
let canMove = true;
let typingInterval = null;
let noCount = 0;
let confettiLaunched = false;

// messages for guilt trip
const guiltMessages = [
  "Wait… are you sure?",
  "But whyyyy 😔",
  "I even dressed up for this 😔",
  "I thought we had something special…",
  "What did I do wrong? 😢",
  "Please? 💖",
];

/* ---------- letter opening ---------- */
openLetterBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  
  setTimeout(() => {
    switchScreen(letterScreen, loginScreen);
  }, 2000);
});

/* ---------- login ---------- */
loginBtn.addEventListener("click", () => {
  if (passwordInput.value !== PASSWORD) {
    loginError.textContent = "Wrong password 😐";
    return;
  }

  noCount = 0;
  switchScreen(loginScreen, valentineScreen);
  typeText(questionEl, "Will you be my Valentine?");
});

/* ---------- type effect ---------- */
function typeText(el, text) {
  if (typingInterval) clearInterval(typingInterval);

  el.textContent = "";
  let i = 0;

  typingInterval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingInterval);
  }, 40);
}

/* ---------- no button ---------- */
noBtn.addEventListener("click", () => {
  noCount++;

  if (noCount >= 7) {
    typeText(questionEl, "Fine! I guess you have no choice now 😏💖");
    noBtn.style.display = "none";

    finalGif.style.display = "block";
    setTimeout(() => {
      finalGif.style.opacity = "1";
    }, 50);

    return;
  }

  typeText(questionEl, guiltMessages[noCount - 1]);

  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
});

document.addEventListener("mousemove", (e) => {
  if (noBtn.style.display === "none") return;

  const rect = noBtn.getBoundingClientRect();

  const buttonCenterX = rect.left + rect.width / 2;
  const buttonCenterY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - buttonCenterX,
    e.clientY - buttonCenterY
  );

  // only react when very close
  if (distance < 18) {
    moveNoButton();
  }
});

function moveNoButton() {
  if (!canMove) return;

  canMove = false;

  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // 500ms cooldown
  setTimeout(() => {
    canMove = true;
  }, 500);
}

/* ---------- yes button ---------- */
yesBtn.addEventListener("click", () => {
  if (!confettiLaunched) {
    // launch confetti twice instead of three times
    launchConfetti();
    setTimeout(() => launchConfetti(), 500);
    confettiLaunched = true;
    
    // create smaller heart explosion
    createHeartExplosion();
  }
  
  switchScreen(valentineScreen, yesScreen);
  
  // trigger smaller heart rain after screen switch
  setTimeout(() => {
    createSmallHeartRain();
  }, 500);
});

/* ---------- heart explosion ---------- */
function createHeartExplosion() {
  const hearts = ['💖', '💗', '💕', '💝'];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    
    const angle = (Math.PI * 2 * i) / 12;
    const velocity = Math.random() * 200 + 150;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(heart);
    
    let x = 0;
    let y = 0;
    let opacity = 1;
    
    const animate = () => {
      x += vx * 0.02;
      y += vy * 0.02;
      opacity -= 0.02;
      
      heart.style.transform = `translate(${x}px, ${y}px)`;
      heart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

/* ---------- small heart rain ---------- */
function createSmallHeartRain() {
  const hearts = ['💖', '💗', '💕', '💝'];
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '-50px';
      heart.style.fontSize = Math.random() * 15 + 12 + 'px';
      heart.style.zIndex = '999';
      heart.style.pointerEvents = 'none';
      heart.style.animation = `heartFall ${Math.random() * 2 + 3}s linear forwards`;
      
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, i * 150);
  }
}

/* ---------- switch ---------- */
function switchScreen(from, to) {
  from.classList.remove("active");
  to.classList.add("active");
}

/* ---------- confetti ---------- */
function launchConfetti() {
  const colors = ["#ff4d6d", "#ffb3c1", "#ffd6e0", "#ff85a1"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

/* ---------- floating hearts ---------- */
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💖" : "💗";
  heart.style.cursor = "pointer";
  
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 24 + 14 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  heart.addEventListener("click", () => {
    // create heart burst effect
    createHeartBurst(heart);
    heart.remove();
  });

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

function createHeartBurst(heart) {
  const rect = heart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    const miniHeart = document.createElement("div");
    miniHeart.textContent = "💕";
    miniHeart.style.position = "fixed";
    miniHeart.style.left = centerX + "px";
    miniHeart.style.top = centerY + "px";
    miniHeart.style.fontSize = "12px";
    miniHeart.style.pointerEvents = "none";
    miniHeart.style.zIndex = "9999";
    
    const angle = (Math.PI * 2 * i) / 8;
    const velocity = 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(miniHeart);
    
    let x = 0;
    let y = 0;
    let opacity = 1;
    
    const animate = () => {
      x += vx * 0.02;
      y += vy * 0.02;
      opacity -= 0.03;
      
      miniHeart.style.transform = `translate(${x}px, ${y}px)`;
      miniHeart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        miniHeart.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

setInterval(createHeart, 350);
