#Memory Game

##Table of Contents

*[Instrutions] (#Instructions)
*[Syntax] (#Syntax)
*[Future Modifications] (#Future Modifications)
*[Contributions] (Contributions)

##Instructions

Simply click a card to start. The timer function does not begin until you click the first card. The timer does not affect your final score.

Stars will update as you play the game. This is based on the number of moves. One move is when a pair of cards have been selected.

When you complete the board you will get a pop up telling you your time and number of stars (score). Click "OK" to reset the board and play again, or "Cancel" to go back to the board.

## Syntax
- board: the clickable playing field
- card / cards: the parts that change and can be matched
- open card: 'flipping' the card so that the symbol is visible
- close card: 'flipping' an open card so that the symbol is hidden
- moves: one move is a pair of cards being selected
- stars: the visual representation of your score

##Fututre Modifications
- the card array in the js file has each card listed twice. would like to change that to each card being listed once and being dupiclated before being added to the board.
- would like to add move cards to the card array and have a dropdown allowing the user to select their number of cards.
- difficulty dropdown that would change how long the cards are displayed before closing.
- experiment with basing the score off the timer rather than moves. possibly a combination of the two.

##Contributions
- I used the Shuffle function from http://stackoverflow.com/a/2450976 as provided by Udacity
- I used the CardArray from Mike's Webinar
