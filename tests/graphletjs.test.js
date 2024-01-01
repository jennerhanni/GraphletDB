const { aboutGraphletJS } = require('../src/index');
const { validNodes} = require('./testData.js');
const fs = require('fs');

const writeToFile = (objToLog) => {
  const dataToLog = JSON.stringify(objToLog);
  fs.writeFileSync('output.txt', dataToLog, (err) => {
      if (err) throw err;
  });
}

test('aboutGraphletJS logs the correct version', () => {
  console.log = jest.fn();
  aboutGraphletJS();
  expect(console.log).toHaveBeenCalledWith('GraphletJS v0.0.1');
});

test('validates valid nodes correctly', () => {
  writeToFile(validNodes)
});