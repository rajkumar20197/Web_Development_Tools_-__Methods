export function compareWords(word1, word2) {
  const w1 = word1.toUpperCase();
  const w2 = word2.toUpperCase();
  let commonLetters = 0;
  const usedIndices = new Set();

  for (let i = 0; i < w1.length; i++) {
    for (let j = 0; j < w2.length; j++) {
      if (w1[i] === w2[j] && !usedIndices.has(j)) {
        commonLetters++;
        usedIndices.add(j);
        break;
      }
    }
  }
  return commonLetters;
}