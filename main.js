let lettersContainer = document.querySelector(".letters");
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "javascript",
    "php",
    "go",
    "scala",
    "fortan",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstaller",
    "whiplash",
    "momento",
    "coco",
    "up",
  ],
  people: [
    "albert ainstein",
    "hitchcock",
    "alexander",
    "cleopatra",
    "mahatma ghandi",
  ],
  countries: ["syria", "palastine", "qatar", "bahrain", "egypt", "yamen"],
};

let allKeys = Object.keys(words);

let randomCatNum = Math.floor(Math.random() * allKeys.length);
let randomCatName = allKeys[randomCatNum];
let randomCatVal = words[randomCatName];
let randomValNum = Math.floor(Math.random() * randomCatVal.length);
let randomValName = randomCatVal[randomValNum];

let cat = document.querySelector(".category span");
cat.innerHTML = randomCatName;

let choosenWord = Array.from(randomValName);
let guesseLtrContiner = document.querySelector(".guessed-letters");

choosenWord.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "space";
  }
  guesseLtrContiner.appendChild(emptySpan);
});

let gueesSpans = document.querySelectorAll(".guessed-letters span");
let draw = document.querySelector(".hangman-draw");
let completed = [];
let wrongAttempts = 0;

document.addEventListener("click", (e) => {
  let status = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let clickedLetter = e.target.innerHTML.toLowerCase();

    choosenWord.forEach((wordLtr, wordLtrIndex) => {
      if (clickedLetter === wordLtr) {
        status = true;

        gueesSpans.forEach((span, spanIndex) => {
          if (wordLtrIndex === spanIndex) {
            span.innerHTML = clickedLetter;

            completed.push(clickedLetter);
          }
        });
      }
    });
    if (status !== true) {
      wrongAttempts++;

      draw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        gameOver();
        lettersContainer.classList.add("finished");
      }
      document.getElementById("fail").play();
    } else if (completed.length === choosenWord.length) {
      done();
      document.getElementById("success").play();

      lettersContainer.classList.add("finished");
    }
  }
});

function gameOver() {
  let div = document.createElement("div");
  div.className = "popup";
  let divText = document.createTextNode(
    `Game over the word is "${randomValName}" `
  );
  div.appendChild(divText);
  document.body.appendChild(div);
}

function done() {
  let div = document.createElement("div");
  let divText = document.createTextNode("You Won");
  let span = document.createElement("span");
  span.innerHTML = " &#x1F600";
  div.appendChild(divText);
  div.appendChild(span);
  div.className = "popup";
  document.body.appendChild(div);
}
