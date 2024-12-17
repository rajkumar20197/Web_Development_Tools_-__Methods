const path = require('path');

const people = `
Name           |  NEUID   | Email                     | Slack handle           | github username
Brett Ritter   | ???      | b.ritter@northeastern.edu | @Brett Ritter (He/Him) | swiftone
Rajkumar Thota | 002875630| thota.raj@northeastern.edu | @thota rajkumar (He/Him) | rajkumar20197
`.split('\n') // convert to array of lines
.filter( line => !!line.replace(/\s/g,'' )); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
