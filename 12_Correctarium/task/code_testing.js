//import path from 'path';
const path = require('path');

// Функція для визначення формату файлу
function getFileFormat(filePath) {
    return path.extname(filePath).toLowerCase();
  }
  
  // Функція для визначення ціни
  function calculatePrice(length, language, format) {
    let price = 0.05 * length;
    let time = 0.5;
  
    if (language == 1) {
      price = 0.12 * length;
      time = time + length / 333;
    }
  
    if (format !== '.docx' && format !== '.doc' && format !== '.rtf') {
      price = price + (price / 100) * 20;
    }
  
    return { price: price.toFixed(2), time: time.toFixed(1) };
  }
  
  // Функція для перевірки мінімальних умов
  function checkMinimumConditions(language, price, time) {
    let s = "";
    if (language == 0 && price < 50) {
      s += "Minimum 50 UAH!\n";
    }
  
    if (language == 1 && price < 120) {
      s += "Minimum 120 UAH!\n";
    }
  
    if (time < 1) {
      s += "Minimum time is 1 hour!";
    }
  
    return s;
  }
  
  //module.exports = getFileFormat;
  module.exports = {
    getFileFormat,
    calculatePrice,
    checkMinimumConditions,
  };
  