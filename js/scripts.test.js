// Unit tests for username validation logic in js/scripts.js
// Using Jest as the test framework

function isValidUsername(username) {
  var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(username);
}

describe('Username Validation', () => {
  test('valid username passes', () => {
    expect(isValidUsername('Password1!')).toBe(true);
    expect(isValidUsername('A1@aaaaa')).toBe(true);
    expect(isValidUsername('Valid123$')).toBe(true);
  });

  test('missing capital letter fails', () => {
    expect(isValidUsername('password1!')).toBe(false);
  });

  test('missing special character fails', () => {
    expect(isValidUsername('Password12')).toBe(false);
  });

  test('missing number fails', () => {
    expect(isValidUsername('Password!')).toBe(false);
  });

  test('less than 8 characters fails', () => {
    expect(isValidUsername('A1@aaaa')).toBe(false);
  });

  test('empty string fails', () => {
    expect(isValidUsername('')).toBe(false);
  });
});
