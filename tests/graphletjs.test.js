const { aboutGraphlet } = require('../src/index');

test('aboutGraphlet logs the correct version', () => {
  console.log = jest.fn();
  aboutGraphlet();
  expect(console.log).toHaveBeenCalledWith('GraphletJS v0.0.1');
});
