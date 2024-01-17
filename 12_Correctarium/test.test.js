const { getFileFormat, calculatePrice, checkMinimumConditions}  = require('./task/code_testing');
// const calculatePrice  = require('./task/code_testing');
// const checkMinimumConditions  = require('./task/code_testing');

describe('getFileFormat', () => {
  test('returns correct file format', () => {
    expect(getFileFormat('1.docx')).toBe('.docx');
    expect(getFileFormat('example.DOC')).toBe('.doc');
    expect(getFileFormat('example.rtf')).toBe('.rtf');
    expect(getFileFormat('example.txt')).toBe('.txt');
  });
});

describe('calculatePrice', () => {
  test('returns correct price and time', () => {
    expect(calculatePrice(100, 0, '.txt')).toEqual({ price: '6.00', time: '0.5' });
    expect(calculatePrice(150, 1, '.docx')).toEqual({ price: '18.00', time: '1.0' });
    // Add more test cases as needed
  });
});

describe('checkMinimumConditions', () => {
  test('returns correct messages', () => {
    expect(checkMinimumConditions(0, 40, 1)).toBe("Minimum 50 UAH!\n");
    expect(checkMinimumConditions(1, 110, 0.5)).toBe("Minimum 120 UAH!\nMinimum time is 1 hour!");
    // Add more test cases as needed
  });
});
