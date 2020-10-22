import squareOfSum from '../src/introduction_to_programming/functions';

console.log(squareOfSum);
test('squareOfSum', () => {
  expect(squareOfSum(1, 0)).toBe(1);
  expect(squareOfSum(8, -3)).toBe(25);
  expect(squareOfSum(2, 2)).toBe(16);
});
