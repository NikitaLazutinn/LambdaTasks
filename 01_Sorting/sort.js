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
 
    rl.question('Choose your operation: \n1. Sort the words alphabetically \n2. Display the numbers in ascending order \n3. Display the numbers in descending order\n4. Display the words in ascending order based on the number of letters in each word\n5. Show only unique words\n6. Show only the unique values from the entire set of words and numbers entered by the user\n7. To exit the program, the user can simply enter "exit." Otherwise, the program will continue to loop, requesting new data and offering sorting options.', (inputOperation) => {
    const operation = parseInt(inputOperation);
    switch(operation) {
      case 1:
        for (let i = 0; i < words.length; i++) {
          for (let j = i + 1; j < words.length; j++) {
            if (words[i] > words[j]) {
              let temp = words[i];
              words[i] = words[j];
              words[j] = temp;
            }
          }
        }
        console.log(words);
        break;
      case 2:
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (parseInt(nums[i]) > parseInt(nums[j])) {
              let temp = nums[i];
              nums[i] = nums[j];
              nums[j] = temp;
            }
          }
        }
        console.log(nums);
        break;
      case 3:
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (parseInt(nums[i]) < parseInt(nums[j])) {
              let temp = nums[i];
              nums[i] = nums[j];
              nums[j] = temp;
            }
          }
        }
        console.log(nums);
        break;
      case 4:
        for (let i = 0; i < words.length; i++) {
          for (let j = i + 1; j < words.length; j++) {
            if (words[i].length > words[j].length) {
              let temp = words[i];
              words[i] = words[j];
              words[j] = temp;
            }
          }
        }
        console.log(words);
        break;
      case 5:
        for (let i = 0; i < words.length; i++) {
          for (let j = i + 1; j < words.length; j++) {
            if (words[i] == words[j]) {
              words.splice(j, 1);
              j--;
            }
          }
        }
        console.log(words);
        break;
      case 6:
        for (let i = 0; i < words.length; i++) {
          for (let j = i + 1; j < words.length; j++) {
            if (words[i] == words[j]) {
              words.splice(j, 1);
              j--;
            }
          }
        }
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (parseInt(nums[i]) == parseInt(nums[j])) {
              nums.splice(j, 1);
              j--;
            }
          }
        }
        console.log(words);
        console.log(nums);
        break;      
      case 7:
        console.log('The program was ended.');
        rl.close();
        break;

        default:
          console.log('Error')
    }

  });
  
});

