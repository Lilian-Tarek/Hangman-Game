// letters
const letters = 'abcdefghijklmnopqrstuvwxyz';
// get array 
let lettersArray = Array.from(letters);
let guessSpans;
// select
let lettersContainer = document.querySelector(".letters");
let categoryspan = document.querySelector(".category span");
let lettersGuessContainer = document.querySelector(".letters-guess");
let wrongAttempts = 0;
let token = 0;
// generate letters
for (let i = 0; i < lettersArray.length; i++) {
    let span = document.createElement("span");
    span.textContent = lettersArray[i];
    span.className = "letterbox";
    lettersContainer.appendChild(span);
}
// object of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python"
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up"
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi"
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};
// get random property
let allkeys = Object.keys(words);
// random number from all keys
let randompropNumber = Math.floor(Math.random() * allkeys.length);
 // Category
let randompropName = allkeys[randompropNumber];
// category words
let randompropValue = words[randompropName];
// random number depend on category num
let randompropValueNumber = Math.floor(Math.random() * randompropValue.length);
 // final word 
let randomfinal = randompropValue[randompropValueNumber];
// show final word
categoryspan.textContent = randompropName;

// letter-guess:::

// Convert the chosen word to Array
let letterandspace = Array.from(randomfinal);

// Create span for each letter
letterandspace.forEach(letter => {
    let span = document.createElement('span');	
    // if letter is space
    if (letter === " ")
    {
        span.className = "emptyspace";
    }
    lettersGuessContainer.appendChild(span);

}
);



// Chosen word
guessSpans = document.querySelectorAll(".letters-guess span");
let theChosenWord =Array.from(randomfinal.toLowerCase());
// handle clicking
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("letterbox") &&
    !event.target.classList.contains("clicked")
  ) {
    event.target.classList.add("clicked");

    let clickedletter = event.target.innerHTML.toLowerCase();
    let thestatus = false;

    theChosenWord.forEach((wordletter, wordindex) => {
      if (wordletter == clickedletter) {
        thestatus = true;
        guessSpans.forEach((span, spanindex) => {
          if (spanindex === wordindex) {
            span.innerHTML = clickedletter;
          }
        });
      }
    });

    if (!thestatus) {
      wrongAttempts++;

      document.querySelector(".hangman-draw").classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
         if (wrongAttempts == 8) {
           endgame();
           lettersContainer.classList.add("finished");
           console.log("finished");
         }
    }
    else
    {
      document.getElementById("success").play();
      won();
      
      
      }
  }
});
function endgame() {
  // create popup window
  let div = document.createElement("div");
  let divtext = document.createTextNode(`Game Over ,The word is ${randomfinal}`);
  div.appendChild(divtext);
  div.className = "popup";
  document.body.appendChild(div);

}
function won()
{
  token = 0;
        guessSpans.forEach((span) => {
          if (span.innerHTML !== "" || span.className =="emptyspace") {
            token++;
          }
        });

        if (token == guessSpans.length) {
          let div = document.createElement("div");
          let divtext = document.createTextNode(
            `You won ,The word is ${randomfinal} ,Amazing`
          );
          div.appendChild(divtext);
          div.className = "popup";
          document.body.appendChild(div);
        }
}






