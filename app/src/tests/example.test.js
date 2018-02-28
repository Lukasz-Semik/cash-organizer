import { add } from './helper-functions/tester';

describe('add', () => {
  it('should return 4 if given 2 and 2', () => {
    const result = add(2, 2);
    expect(result).toBe(4);
  })
});
