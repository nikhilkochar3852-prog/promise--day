const bgMusic = document.getElementById("bgMusic");

const questions = [
  {
    question: "What should always come first in our relationship?",
    options: [
      "My ego (obviously 😌)",
      "Silent treatment 🙄",
      "Understanding & respect 🤍",
      "Winning arguments every time 😎"
    ],
    correct: 2
  },
  {
    question: "When we fight, what do we promise to do?",
    options: [
      "Block each other dramatically 🚫",
      "Sleep angry 😤",
      "Talk, hug, fix it & stay together 💞",
      "Post sad quotes on Instagram 😏"
    ],
    correct: 2
  },
  {
    question: "Our forever rule is…",
    options: [
      "No overthinking",
      "No giving up on each other 💍",
      "No saying sorry ever",
      "No drama (impossible)"
    ],
    correct: 1
  },
  {
    question: "When life gets hard, we will…",
    options: [
      "Blame each other",
      "Walk away",
      "Hold hands tighter & fight together 🤝",
      "Cry separately"
    ],
    correct: 2
  },
  {
    question: "Our biggest Promise today is…",
    options: [
      "Love only when it’s easy",
      "Choose each other every single day 💖",
      "Stay only in good times",
      "Argue professionally"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById("welcomeScreen").classList.remove("active");
  document.getElementById("quizScreen").classList.add("active");
  bgMusic.play().catch(() => {});
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("progressText").innerText = `Promise ${currentQuestion + 1}/5`;
  document.getElementById("questionText").innerText = q.question;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option-btn");

    btn.onclick = () => {
      showFloatingLove(btn);

      if (index === q.correct) {
        score++;
        showKiss();
      }

      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion();
        } else {
          showResult();
        }
      }, 1000);
    };

    container.appendChild(btn);
  });
}

function showFloatingLove(element) {
  const emojis = ["💖","💘","💞","💕","💓","💗","💋"];
  const love = document.createElement("div");
  love.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  love.classList.add("floating-love");

  love.style.left = element.getBoundingClientRect().left + 50 + "px";
  love.style.top = element.getBoundingClientRect().top + "px";

  document.body.appendChild(love);

  setTimeout(() => love.remove(), 2000);
}

function showKiss() {
  const kiss = document.createElement("div");
  kiss.innerText = "💋";
  kiss.classList.add("kiss");
  document.body.appendChild(kiss);

  setTimeout(() => kiss.remove(), 1500);
}

function showResult() {
  document.getElementById("quizScreen").classList.remove("active");
  document.getElementById("resultScreen").classList.add("active");

  const resultDiv = document.getElementById("resultContent");

  if (score === 5) {
    resultDiv.innerHTML = `
      <h2>You chose us. Every single time. 💍</h2>
      <p>I promise to annoy you, love you, kiss you, protect you and choose you forever.</p>
      <button class="primary-btn" onclick="megaConfetti()">Seal The Forever Promise 💖</button>
    `;
  } else {
    resultDiv.innerHTML = `
      <h2>Not perfect… but still mine 😌</h2>
      <p>Will you promise to stay with me forever?</p>
      <button class="primary-btn" id="yesBtn">Yes, Forever 💍</button>
      <button class="option-btn" id="noBtn">No 🙈</button>
    `;

    let yes = document.getElementById("yesBtn");
    let no = document.getElementById("noBtn");

    no.onclick = () => {
      yes.style.transform = "scale(1.3)";
      no.style.transform = "scale(0.7)";
      no.style.opacity = "0.6";
    };

    yes.onclick = megaConfetti;
  }
}

function megaConfetti() {
  for (let i = 0; i < 200; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background = Math.random() > 0.5 ? "gold" : "#ff4d6d";
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 3000);
  }

  document.getElementById("resultContent").innerHTML =
    "<h2>Promise Accepted. Sealed With Love 💋💍</h2><p>You are stuck with me forever now 😏</p>";
}
