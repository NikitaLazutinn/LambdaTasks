const { exit } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let s = "";
let tempor = "";

function isLetter(character) {
  return (/[a-zA-Z]/).test(character);
}

function isNumber(character) {
  return !isNaN(character) && character !== ' ';
}


  rl.question('Input your words and numbers: ', (inputL) => {
    s = inputL;

    let words = [];
    for (let i = 0; i < s.length; i++) {
      if (isLetter(s[i])) {
        while (s[i] != ' ' && i < s.length) {
          tempor += s[i];
          i++;
        }
        words.push(tempor);
        tempor = "";
      }
    }

    let nums = [];
    for (let i = 0; i < s.length; i++) {
      if (isNumber(s[i])) {
        while (s[i] != ' ' && i < s.length) {
          tempor += s[i];
          i++;
        }
        nums.push(tempor);
        tempor = "";
      }
    }
function processInput() {

    rl.question('Choose your operation: \n1. Sort the words alphabetically \n2. Display the numbers in ascending order \n3. Display the numbers in descending order\n4. Display the words in ascending order based on the number of letters in each word\n5. Show only unique words\n6. Show only the unique values from the entire set of words and numbers entered by the user\n7. To exit the program, the user can simply enter "exit." Otherwise, the program will continue to loop, requesting new data and offering sorting options.', (inputOperation) => {
      const operation = parseInt(inputOperation);
      switch (operation) {
        case 1:
          words.sort();
          console.log(words);
          break;
        case 2:
          nums.sort((a, b) => parseInt(a) - parseInt(b));
          console.log(nums);
          break;
        case 3:
          nums.sort((a, b) => parseInt(b) - parseInt(a));
          console.log(nums);
          break;
        case 4:
          words.sort((a, b) => a.length - b.length);
          console.log(words);
          break;
        case 5:
          const uniqueWords = [...new Set(words)];
          console.log(uniqueWords);
          break;
        case 6:
          const uniqueValues = [...new Set([...words, ...nums])];
          console.log(uniqueValues);
          break;
        case 7:
          console.log('The program was ended.');
          rl.close();
          exit();
          break;
        default:
          console.log('Error');
      }
      processInput(); // Call the function recursively
    });
  }
  processInput();
  });


// Start the program

