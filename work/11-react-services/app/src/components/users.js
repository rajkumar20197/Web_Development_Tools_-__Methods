const wordFor = {};

function isValidUsername(username) {
  return /^[A-Za-z0-9_]+$/.test(username) && username !== 'dog';
}

function isValidWord(word) {
  return /^[A-Za-z]*$/.test(word);
}

export { isValidUsername, isValidWord, wordFor };