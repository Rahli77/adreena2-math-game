const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const feedback = document.getElementById('feedback');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('scoreVal');
const levelDisplay = document.getElementById('level');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const clickSound = document.getElementById('clickSound');
const highscoreDisplay = document.getElementById('highscore');

let level = 1;
let score = 0;
let correctInRow = 0;
let currentQuestion = {};
let timer = 45;
let timerInterval;

function playClick() {
  clickSound.play();
}

function generateQuestion() {
  let a = Math.floor(Math.random() * 10 + 1);
  let b = Math.floor(Math.random() * 10 + 1);
  currentQuestion = { a, b, answer: a * b };
  questionElement.textContent = `${a} × ${b} = ?`;
  answerInput.value = '';
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 45;
  timerDisplay.textContent = timer;
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) gameOver();
  }, 1000);
}

function submitAnswer() {
  playClick();
  const userAnswer = parseInt(answerInput.value);
  if (userAnswer === currentQuestion.answer) {
    correctSound.play();
    feedback.textContent = "✅ Benar!";
    score++;
    correctInRow++;
    timer += 15;
    if (correctInRow >= 10) {
      level++;
      correctInRow = 0;
      alert(`🎉 Level ${level} tercapai!`);
    }
    updateDisplay();
    generateQuestion();
  } else {
    wrongSound.play();
    feedback.textContent = "❌ Salah! Game Over!";
    gameOver();
  }
}

function updateDisplay() {
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

function gameOver() {
  clearInterval(timerInterval);
  saveHighScore();
  alert(`😢 Game Over, Adreena! Skor kamu: ${score}`);
  resetGame();
}

function resetLevel() {
  playClick();
  correctInRow = 0;
  timer = 45;
  generateQuestion();
  startTimer();
}

function restartGame() {
  playClick();
  resetGame();
  generateQuestion();
  startTimer();
}

function resetGame() {
  score = 0;
  level = 1;
  correctInRow = 0;
  updateDisplay();
}

function saveHighScore() {
  const high = parseInt(localStorage.getItem("highscore") || "0");
  if (score > high) {
    localStorage.setItem("highscore", score);
  }
}

function showHighScore() {
  playClick();
  document.getElementById("highscoreBox").style.display = "block";
  highscoreDisplay.textContent = localStorage.getItem("highscore") || "0";
}

window.onload = () => {
  generateQuestion();
  startTimer();
};
function playMusic() {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.play().then(() => {
    document.getElementById("startMusic").style.display = "none";
  }).catch((err) => {
    console.log("Autoplay ditolak, interaksi pengguna dibutuhkan.");
  });
}
