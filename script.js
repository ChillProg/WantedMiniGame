var image = document.getElementById("characterImg");
var container = document.getElementById("bottomScreenContainer");
var characters = ["Mario", "Luigi", "Wario", "Yoshi"];
var containerWidth = container.offsetWidth;
var containerHeight = container.offsetHeight;
var targetCharacter = "";
var timer;
var seconds = 10;
var firstNumber = document.getElementById("firstNumber");
var secondNumber = document.getElementById("secondNumber");
var level = 0;

function selectRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function changeCharacterImage(targetCharacter, isMini) {
  return "./assets/" + (isMini ? "Mini" : "") + targetCharacter + ".png";
}

function selectOtherCharacter(targetCharacter) {
  do {
    randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  } while (randomCharacter === targetCharacter);
  return randomCharacter;
}

function createMiniCharacters(targetCharacter) {
  var randomZIndex = Math.floor(Math.random() * 10) + 1;
  var characterImg = document.createElement("img");
  characterImg.className = "minicharacterImg";
  characterImg.src = changeCharacterImage(targetCharacter, true);
  characterImg.setAttribute("data-id", targetCharacter);
  characterImg.style.zIndex = randomZIndex;
  var randomLeft = Math.floor(Math.random() * containerWidth);
  var randomTop = Math.floor(Math.random() * containerHeight);
  characterImg.style.left = randomLeft - 15 + "px";
  characterImg.style.top = randomTop - 15 + "px";
  container.appendChild(characterImg);
}

container.addEventListener("click", function (event) {
  var clickedCharacter = event.target;
  if (clickedCharacter.className === "minicharacterImg") {
    stopTimer();

    if (clickedCharacter.getAttribute("data-id") === targetCharacter) {
      console.log("¡Correct!");
      seconds += 5;
      restartGame();
    } else {
      console.log("¡Incorrect!");
      seconds -= 5;
      startTimer();
    }
  }
});

function startTimer() {
  timer = setInterval(function () {
    seconds--;
    updateTimer(seconds);
    if (seconds <= 0) {
      finishGame();
    }
  }, 1000);
}

function updateTimer(seconds) {
  var tmpsecond = seconds.toString().padStart(2, "0");
  firstNumber.src = "./assets/" + tmpsecond[0] + ".png";
  secondNumber.src = "./assets/" + tmpsecond[1] + ".png";
  console.log(seconds + "s");
}

function stopTimer() {
  clearInterval(timer);
}

function updateLevel(level) {
  var levelTmp = level.toString().padStart(2, "0");
  firstLevelNumber.src = "./assets/" + levelTmp[0] + ".png";
  secondLevelNumber.src = "./assets/" + levelTmp[1] + ".png";
  console.log(level + "level");
}

function restartGame() {
  clearInterval(timer);
  level += 1;
  updateLevel(level);
  container.innerHTML = "";
  startGame();
}

function finishGame() {
  clearInterval(timer);
  console.log("¡Finish!");
  container.innerHTML = "";
  container.style.backgroundColor = "#ffe742";
  var playAgainImg = document.createElement("img");
  playAgainImg.className = "playAgain";
  playAgainImg.src = "./assets/playAgain.png";
  playAgainImg.onclick = function () {
    container.style.backgroundColor = "black";
    level = 0;
    seconds = 30;
    restartGame();
  };
  container.appendChild(playAgainImg);
}

function startGame() {
  targetCharacter = selectRandomCharacter();
  image.src = changeCharacterImage(targetCharacter, false);
  startTimer();
  createMiniCharacters(targetCharacter);
  var numCharacters = Math.ceil(Math.pow(level, 2)) + 10;
  for (var i = 0; i < numCharacters; i++) {
    createMiniCharacters(selectOtherCharacter(targetCharacter));
  }
}

restartGame();
