/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Lecture Objectives

/** How to create our fundamental game variables */
var scores, roundScore, activePlayer, gamePlaying, prevDice, prevDice1, maxScore;

init();

/** How to generate a random number */
//dice = Math.floor(Math.random() * 6) + 1;

/** How to manipulate the DOM */
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

/** How to read from the DOM */
//var x = document.querySelector('#score-0').textContent;
//console.log(x);


/** How to set up an event handler */
//document.querySelector('.btn-roll').addEventListener('click', /* function*/ );

/** What a callback function is */
/*function btn() {
    // dow something here
}
btn();

document.querySelector('.btn-roll').addEventListener('click', btn);
*/


/** What an anonymous function is */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // set final winning score
        setWinningScore();

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        var dice1DOM = document.querySelector('.dice1');
        diceDOM.style.display = 'block'; // make dice visible
        dice1DOM.style.display = 'block'; // make second dice visible

        /** How to change the image in an <img> element */
        diceDOM.src = 'dice-' + dice + '.png';
        dice1DOM.src = 'dice-' + dice1 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice1 !== 1) {
            if ((prevDice === 6 && dice === 6) || (prevDice1 === 6 && dice1 === 6)) {
                document.getElementById('current-' + activePlayer).textContent = '0';
                document.getElementById('score-' + activePlayer).textContent = '0';
                prevDice = dice;
                prevDice1 = dice1;
                scores[activePlayer] = 0;
                nextPlayer();
            } else {
                // add score
                roundScore += (dice + dice1);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                prevDice = dice;
                prevDice1 = dice1;
            }
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add the current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});
/** How to use function to correctly apply the DRY (Don't repeat yourself) principal */
function nextPlayer() {
    /** What is a ternary operator */
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDice = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    /** How to add, remove and toggle HTML classes */
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
/** How to think about the game logic like a programmer */

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevDice = 0;
    maxScore = document.getElementById('winning_score').value;
    document.getElementById('winning_score').disabled = false;

    /** How to change CSS styles */
    document.querySelector('.dice').style.display = 'none'; // hide the dice initially
    document.querySelector('.dice1').style.display = 'none'; // hide the dice initially

    /** Another way to select elements by ID */
    // set all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function setWinningScore() {
    maxScore = document.getElementById('winning_score').value;
    // disable winning score selection
    document.getElementById('winning_score').disabled = true;
}

/** What a state variable is an how to use it 
 *  describes the current state of a variable
 */