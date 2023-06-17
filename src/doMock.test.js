const track = require("./tracker");
const mod = require(".");

/**
 * After installing jest v29, if you run `index.test.js` as originally written, using `jest.mock()`,
 * you will see this error in reference to the variable 'track':
 *    The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables.
 *
 * This is because `jest.mock()` creates the mock before evaulating anything outside its scope.
 * `jest.doMock()` ensures that all `require()` variables are evaluated before mocking.
 *
 * So 'mod' will be evaulated before the mock, giving it the values of `data` before the mock.
 *
 */
jest.doMock("./data", () => {
  track("data-mock");
  return { isMock: true };
});
/**
 * This next requires will cause the mock to be executed, giving 'data' the mock values
 * and causing 'track()' to add the new value.
 */
const data = require("./data");

test("use mock", () => {
  expect(mod).toEqual({ data: { baz: "buzz", foo: "bar" } });
  expect(data).toEqual({ isMock: true });
  expect(track.tracks).toEqual(["data", "index", "data-mock"]);
});
