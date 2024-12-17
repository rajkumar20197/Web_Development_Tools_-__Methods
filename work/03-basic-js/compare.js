"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

const wordLower = word.toLowerCase();
const guessLower = guess.toLowerCase();

const letterCount = {};
let commonCount = 0;


for (const letter of wordLower) {
  letterCount[letter] = (letterCount[letter] || 0) + 1;
}


for (const letter of guessLower) {
  if (letterCount[letter]) {
    commonCount++;
    letterCount[letter]--;
  }
}

return commonCount;

}
