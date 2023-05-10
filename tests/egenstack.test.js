const stack = require('../src/stack');

describe('Stack', () => {
  beforeEach(() => {
    // Clear the stack before each test
    stack.length = 0;
  });

  test('push adds an element to the top of the stack', () => {
    expect(stack.peek()).toBeUndefined();

    stack.push(1);
    expect(stack.peek()).toBe(1);

    stack.push('hello');
    expect(stack.peek()).toBe('hello');
  });
});