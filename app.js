/*
   The Mole game description:
   - First screen will include:
     - score - start as 0 (zero)
     - time left - 30 seconds
     - mole holding 'start sign' in one hole
     - all the other holes should be empty (no mole)
   - When clicking on the mole holding 'start' sign
     - game is starting
     - time start to count down
     - mole appear randomly within random time period
     - mole disappear after a period of time
   - while clicking on a hole where the mole is visible:
     - if game is over (timer is zero) do nothing
     - mole face change to 'hit'
     - score goes up, one point
     - mole disappear
   - which clicking on a hole where the mole is not visible
     - do nothing
   - when the time is up:
     - game is over
     - game reset (first screen): score, time, all holes should be empty
 */

// Initial screen (state)
// create an object with all the relevant game information
const game = {
  score: 0,
  time: 5,
  gameOver: true
}

/*
  We will need a random number for both choosing a random hole,
  and define random time
 */
function generateRandomNumber(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

// Get reference to all DOM elements needed
const scoreElement = document.querySelector('#score > span');
const holesElements = document.querySelectorAll('.hole');
const timerElement = document.querySelector('#time > span');
const scoresListContainer = document.querySelector('#scores');
const playerName = document.querySelector('#player_name');
const popUpContainer = document.querySelector('#sign-up');
const submitBtn = document.querySelector('#submit');
const signupParagraph =  document.querySelector('#sign-up p');


/*
  Executed when clicking on the hole with the class 'start'
  starts the game: start a counter, and call moleAppear
 */
  function startGame() {
    // remove the start class from the first hole
    // and attach whack to the click event
    holesElements[0].classList.remove('start');
    holesElements[0].addEventListener('click', whack());

    // first, set gameOver flag to false
    game.gameOver = false;
  
    // remove the start class from the first hole
    // and attach whack to the click event
    //holesElements[0].classList.remove('start');
  
    // start a timer that updates the game time
    let timerId = setInterval(() => {
      // when the time is up (time is zero)
      if(game.time === 0) {
        // stop the timer
        clearInterval(timerId);        
        createNewItemScore(game.score);                
        resetGame();
      } else {
        // update the game state
        game.time -= 1;
        
        // sync the UI
        timerElement.innerText = game.time;
      }
    }, 1000);
  
    // attach the function whcak() to all holes divs
    holesElements.forEach((hole) => {
      hole.addEventListener('click', whack)
    });

    moleAppear();
  }
  
/*
  Handle Mole appearance in random hole.
  add the class 'up' on one of the holes div (div with CDD class hole)
  and after a period of time, remove the class 'up' to make it disappear
 */
  function moleAppear() {
    // If game over, return
    if(game.gameOver) return;
  
    // generate random number between 0 and the number of holes
    const randomNumber = generateRandomNumber(holesElements.length);
  
    // the holes are collection of divs
    // get one of the holes with this number as an index
    const randomHoleElement = holesElements[randomNumber]
  
    // add the class 'up' to make the mole appear
    randomHoleElement.classList.add('up');
    
    // after some time, remove the class 'up' to make it disappear
    setTimeout(() => {
      randomHoleElement.classList.remove('up');
      moleAppear();
    }, 800)
  
  }
  

/*
  This function get executed when clicking on
  a 'hole div' (div with the css class named 'hole)
 */
function whack(event) {
  // check if the game is over - if so - do nothing
  if(game.gameOver) return;

  // When the class 'up' presents - the mole is visible
  if(event.target.classList.contains('up')) {
    // the 'hit' change the mole image
    event.target.classList.replace('up', 'hit');

    // update the score adding one point
    game.score += 1;

    // update the UI to show the new score
    scoreElement.innerText = game.score;

  }
  // removing the 'hit' class will make the mole disappear
  setTimeout(() => {
    event.target.classList.remove('hit');
  }, 500)
}

/*
  this function expects input to enter player name,
   and creating new item list.
   - also to save a players name we need to open popup with input text field to allow 
   the user to save his recored.
*/
function createNewItemScore(finalScore) {
  //open popup window to enter user name and save it in 'const' variable
  if(popUpContainer.classList.contains('hide')) {
    popUpContainer.classList.replace('hide', 'show');
  }
  //leting the user know his score again
  signupParagraph.innerText = 'wow! you score ' + finalScore + ' pointes!';

  //creating list item with users name entered and the final score he got
  const newPlayerScoreItem = document.createElement('li');
  const playerNameSpan = document.createElement('span');
  const playerScoreSpan = document.createElement('span');

  newPlayerScoreItem.appendChild(playerNameSpan);
  newPlayerScoreItem.appendChild(playerScoreSpan);

  //botton to inset the score + name inside the socres unordered list we pre created.
  submitBtn.addEventListener('click', function() {
    
    playerNameSpan.innerText = playerName.value;
    playerScoreSpan.innerText = finalScore;

    let i = 0;
    while(i <= scoresListContainer.children.length) {     
      scoresListContainer.appendChild(newPlayerScoreItem);
      i++;      
    }

    playerName.value = '';
    
    //hidding the popup after we initiate the sequence.
    popUpContainer.classList.replace('show', 'hide');
  });
  
  
}

/*
  init game, reset all the values to the starting point
  and show the mole with the class start so we cam start the game
 */
function resetGame() {
  // reset game to initial values
  game.gameOver = true;
  game.score = 0;
  game.time = 5;

  // sync the UI
  timerElement.innerText = game.time;
  scoreElement.innerText = game.score;

  initGame();
}

/*
  reseting the game to defualt settings
*/
function initGame() {
  // The first 'hole' should have the class 'start'
  // and when it clicked - it shoud call start game;
  holesElements[0].classList.add('start');
  if(holesElements[0].classList.contains('start')) {
    holesElements[0].addEventListener('click', startGame);  
  }
}

initGame();