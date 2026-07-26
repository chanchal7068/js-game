let box = document.getElementById("box");
let scoreEl = document.getElementById("score");
let highScoreEl = document.getElementById("highScore");
let timeEl = document.getElementById("time");
let levelEl = document.getElementById("level");

let clickSound = document.getElementById("clickSound");
let bgMusic = document.getElementById("bgMusic");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timeLeft = 30;
let level = 1;
let gameInterval;
let moveSpeed = 1000;

highScoreEl.innerText = highScore;

function moveBox() {
  let x = Math.random() * 460;
  let y = Math.random() * 360;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

box.addEventListener("click", () => {
  score++;
  scoreEl.innerText = score;
  clickSound.play();

  // level increase
  if (score % 5 === 0) {
    level++;
    levelEl.innerText = level;

    if (moveSpeed > 300) {
      moveSpeed -= 100;
      clearInterval(gameInterval);
      gameInterval = setInterval(moveBox, moveSpeed);
    }
  }

  moveBox();
});

function startGame() {
  score = 0;
  timeLeft = 30;
  level = 1;
  moveSpeed = 1000;

  scoreEl.innerText = score;
  timeEl.innerText = timeLeft;
  levelEl.innerText = level;

  bgMusic.play();

  gameInterval = setInterval(moveBox, moveSpeed);

  let timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(gameInterval);
      bgMusic.pause();

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.innerText = highScore;
      }

      alert("Game Over 😢 Your Score: " + score);
    }
  }, 1000);
}
