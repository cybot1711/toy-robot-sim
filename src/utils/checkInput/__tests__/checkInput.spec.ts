import { checkInput } from '../checkInput';

describe('utils:checkInput', function () {
  it('should return false on incorrect input', function () {
    // @ts-expect-error: Check for weird input although ts will guard against.
    expect(checkInput({ x: 'acd', Y: 3, F: '3' })).toBe(false);
  });

  it('should return true on correct input', function () {
    expect(checkInput({ x: 1, y: 3, f: 'EAST' })).toBe(true);
  });
});
