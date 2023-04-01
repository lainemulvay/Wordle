const targetList = ["scope", "craze", "froth", "sloth", "hanky", "plate", "sauce", "piano",
  "braid", "puppy", "kitty", "sixth", "booth", "sweat", "horse"];
const randomIndex = Math.floor(Math.random() * targetList.length);
const target = targetList[randomIndex].toUpperCase();
window.onload = newWord();

function newWord() {
  // No need to define target here since it's already a global variable
  console.log("Target: " + target);
  return target;
}

function getWrittenFeedback() {
  let feedbackString = "";
  let letters = ["first", "second", "third", "forth", "fifth"]
  let guess = lastGuess

  // Loop through each letter of guess
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    let letterNumber = letters[i]
    
    if (letter === target[i]) {
      feedbackString += "<span>The " + letterNumber + " letter is in the correct position.</span><br>";
    }
    // Check if letter is in the word, but in a different position
    else if (target.includes(letter)) {
      feedbackString += "<span>The " + letterNumber + " letter appears in the word, but in a different position.</span><br>";
    }
    // Letter is not in the word
    else {
      feedbackString += "<span>The " + letterNumber + " letter doesn't appear in the word.</span><br>";
    }
    feedbackStringGLOBAL = feedbackString;
  }

  // Combine feedback and display on HTML page
  document.getElementById("problem").innerHTML = feedbackString;

  // Change button text
  if (document.getElementById("written-feedback").innerHTML == "Get Written Feedback") {
    document.getElementById("written-feedback").innerHTML = "Hide Feedback";
    document.getElementById("problem").innerHTML = feedbackString;
  }
  else if (document.getElementById("written-feedback").innerHTML == "Hide Feedback") {
    document.getElementById("written-feedback").innerHTML = "Get Written Feedback";
    document.getElementById("problem").innerHTML = ""
  } 
  focusInputField();  
}

function focusInputField() {
  document.getElementById("guess-input").focus();
}

document.addEventListener("DOMContentLoaded", function() {
  let textInput = document.getElementById("guess-input");
  textInput.addEventListener("keyup", function(event) {
    // Check if the Enter key was pressed
    if (event.keyCode === 13) {
      wordle();
    }
  });
});

function wordle() {
  let guess = document.getElementById("guess-input").value;
  lastGuess = guess;

  document.getElementById("problem").innerHTML = "";

  // Check if both words are 5 letters
  if (document.getElementById("written-feedback").innerHTML == "Hide Feedback") {
    getWrittenFeedback();
    // adds the feedback back
    document.getElementById("written-feedback").innerHTML = "Hide Feedback";
    document.getElementById("problem").innerHTML = feedbackStringGLOBAL;
  }
  if (guess.length !== 5) {
    document.getElementById("problem").textContent = "Error: Guess must have exactly 5 letters.";
    return;
  }
  if (target.length !== 5) {
    document.getElementById("problem").textContent = "Error: Problem with Target, It must have exactly 5 letters. Contact developer.";
    return;
  }
  
    // Initialize variables
    const feedbackArray = [];

    // Loop through each letter of guess
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      
      // Check if letter is in the correct position
      if (letter === target[i]) {
        feedbackArray.push(2);
      }
      // Check if letter is in the word, but in a different position
      else if (target.includes(letter)) {
        feedbackArray.push(1);
      }
      // Letter is not in the word
      else {
        feedbackArray.push(0);
      }
    }

    // Combine feedback and display on HTML page
    console.log("Guess Array: " + JSON.stringify(feedbackArray));
  WordleRow(feedbackArray);
}

function WordleRow(feedbackArray) {
  let table = document.getElementById("feedback-table");
  let row = table.insertRow();
  for (let i = 0; i < feedbackArray.length; i++) {
    let cell = row.insertCell(i);
    cell.setAttribute("id", "level" + feedbackArray[i].toString());
    cell.innerHTML = document.getElementById("guess-input").value[i];
  }
  if (JSON.stringify(feedbackArray) === JSON.stringify([2,2,2,2,2])) {
    document.getElementById('out-of-guesses').textContent = "!!! WINNER !!!!";
    document.getElementById('play-again').innerHTML = "<span>(Refresh the page to play again)</span>"
    document.getElementById('guess-input').disabled = true;
    document.getElementById('play-wordle').disabled = true;
    document.getElementById('written-feedback').disabled = true;
    return;
  }
  if (table.rows.length == 6 && (JSON.stringify(feedbackArray) !== JSON.stringify([2,2,2,2,2]))) {
    document.getElementById('out-of-guesses').textContent = "You're out of guesses!";
    document.getElementById('answer').innerHTML = "The word was <br>" + target;
    document.getElementById('play-again').innerHTML = "<span>(Refresh the page to play again)</span>"
    return;
  }
  document.getElementById("guess-input").value = ""; // Clear input field (optional

}
