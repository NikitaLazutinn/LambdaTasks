const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const content = fs.readFileSync('D:/webDEv/tasks/LambdaTasks/12_Correctarium/1.json');
const sourceJSON = JSON.parse(content);
const Math  = require('Math');

const app = express();
const port = 3000; 

const path = require('path');


function getFileFormat(format) {
if (format.includes('docx') && format.includes('doc') && format.includes('rtf')) {
  return true;
}
return false;
}


function calculateDeadline(hoursNeeded) {
    let startDate = new Date();
     
  
    while (startDate.getDay() === 0 || startDate.getDay() === 6) {
      startDate.setDate(startDate.getDate() + 1); 
    }
  
    let currentHours = 0;
    while (currentHours < hoursNeeded) {
      
      if (startDate.getDay() !== 5) {
        currentHours += 1;
      }
      
      while (startDate.getDay() === 0 || startDate.getDay() === 6 || startDate.getHours() >= 19 || startDate.getHours() < 10){
        if(startDate.getHours() < 10){
          startDate.setHours(10, 0, 0, 0);
        }else{
        startDate.setDate(startDate.getDate() + 1); 
        startDate.setHours(10, 0, 0, 0);
        }

      }
      startDate.setHours(startDate.getHours() + 1);
    }

const year = startDate.getFullYear();
const month = startDate.getMonth() + 1; 
const day = startDate.getDate();
const hours = startDate.getHours();
const minutes = startDate.getMinutes();
const seconds = startDate.getSeconds();

const fullDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year} ${hours}:${minutes}:${seconds}`;
  
    return fullDate;
}


function calculatePrice(length, language, format) {
    let price = 0.05 * length;
    let time = 0.5;
  
    if (language == 'en') {
      price = 0.12 * length;
      time = time + length / 333;
    }else{
      time = time + length / 1333;
    }
  
    if (format == false) {
      price = price + (price / 100) * 20;
    }
    time = Math.ceil(time);
    const date = calculateDeadline(time);

    return { price: price.toFixed(2), time: time.toFixed(1), deadline: date};
}


app.use(bodyParser.json());

app.post('/', (req, res) => {
   let format = getFileFormat(sourceJSON.mimetype);
   let price_time = calculatePrice(sourceJSON.count, sourceJSON.language, format);
    res.json({ message: '-', data: price_time });

});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


// const filePath = '1.dox';
// let length = 1;
// let price = 0;
// let time = 0.5;

// const format = path.extname(filePath).toLowerCase();

// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   length = data.length;

// });

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question('Choose language: if ENG - press 1, if UKR/RUS - press 0\n', (language) => {

//   if (isNaN(language)) 
//   {
//     console.log('Incorrect input!');
//     rl.close();
//   }
//   else
//   {

//     if(language == 0)
//     {
//       price = 0.05 * length;
//       time = time + length/1333;

//     }
//     else
//     {
//       price = 0.12 * length;
//       time = time + length/333;

//     }
//     if (format != '.docx' || format != '.doc' || format != '.rtf')
//     {
//       price = price + (price/100)*20;
//     }
//     console.log(`Price: ${price.toFixed(2)} UAH`);
//     console.log(`Time: ${time.toFixed(1)} hours`);
//     if(language == 0 && price < 50)
//     {
//       console.log("Minimum 50 UAH!");
//     }
//     if(language == 1 && price < 120)
//     {
//       console.log("Minimum 120 UAH!");
//     }
//     if(time < 1){
//       console.log("Minimum time is 1 hour!");
//     }
    
//     rl.close();
//   }


// });




