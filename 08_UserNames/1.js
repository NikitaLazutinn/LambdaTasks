console.time('programExecution');
const fs = require('fs');
const path = require('path');


function readWordsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split(/\s+/);
}

function processFiles() {
  const usernameSet = new Set();
  const usernameCountInAllFiles = {};
  const usernameCountInAtLeast10Files = {};

    for (let i = 0; i < 20; i++) {
    const filePath = path.join(__dirname, `out${i}.txt`);
    const words = readWordsFromFile(filePath);

    words.forEach(word => usernameSet.add(word));

    words.forEach(word => {
      usernameCountInAllFiles[word] = (usernameCountInAllFiles[word] || 0) + 1;
    });

    if (i >= 10) {
      words.forEach(word => {
        usernameCountInAtLeast10Files[word] = (usernameCountInAtLeast10Files[word] || 0) + 1;
      });
    }
  }

  const uniqueUsernamesCount = usernameSet.size;

  const usernamesInAllFiles = Object.keys(usernameCountInAllFiles).filter(username => usernameCountInAllFiles[username] === 20);

  const usernamesInAtLeast10Files = Object.keys(usernameCountInAtLeast10Files).filter(username => usernameCountInAtLeast10Files[username] >= 10);

  console.log('Unique usernames: ', uniqueUsernamesCount);
  console.log('Usernames appear in all files: ', usernamesInAllFiles.length);
  console.log('Usernames appear in at least 10 files: ', usernamesInAtLeast10Files.length);
}


processFiles();

console.timeEnd('programExecution');