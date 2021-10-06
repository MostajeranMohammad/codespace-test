import { spliterCharacter } from './consts';
import { StringParams } from './string-params.model';

test('testing encoder: must create formatted string.', () => {
  const stringParams = new StringParams(
    'firstOption',
    'http//example.com/hello.txt',
    '1',
  ).encode();
  expect(stringParams).toMatch(
    'firstOption' +
      spliterCharacter +
      'http//example.com/hello.txt' +
      spliterCharacter +
      '1',
  );
});

test('testing encoder with special characters: must create formatted string.', () => {
  const stringParams = new StringParams(
    'firstOption',
    'http//example.com/{^}%/hello.txt',
    '1',
  ).encode();
  expect(stringParams).toMatch(
    'firstOption' +
      spliterCharacter +
      encodeURI('http//example.com/{^}%/hello.txt') +
      spliterCharacter +
      '1',
  );
});

test('testing decoder: must create StringParams Object correctly.', () => {
  const formatedString =
    'firstOption' +
    spliterCharacter +
    'http//example.com/hello.txt' +
    spliterCharacter +
    '1';
  expect(StringParams.decode(formatedString)).toEqual(
    new StringParams('firstOption', 'http//example.com/hello.txt', '1'),
  );
});

test('testing decoder with special characters: must create StringParams Object correctly.', () => {
  const formatedString =
    'firstOption' +
    spliterCharacter +
    encodeURI('http//example.com/{^}%/hello.txt') +
    spliterCharacter +
    '1';
  expect(StringParams.decode(formatedString)).toEqual(
    new StringParams('firstOption', 'http//example.com/{^}%/hello.txt', '1'),
  );
});

test('testing decoder: must throw error because of wrong format.', () => {
  const formatedString = 'wrong format';
  expect(() => StringParams.decode(formatedString)).toThrow();
});

test('testing decoder: must throw error because of wrong spliterCharacter.', () => {
  const formatedString =
    'firstOption' +
    '@#' + // spliterCharacter
    encodeURI('http//example.com/{^}%/hello.txt') +
    '@#' + // spliterCharacter
    '1';
  expect(() => StringParams.decode(formatedString)).toThrow();
});

test('testing decoder: must throw error because of wrong part count.', () => {
  let formatedString =
    'firstOption' +
    spliterCharacter +
    'http//example.com/hello.txt' +
    spliterCharacter +
    '1' +
    spliterCharacter +
    'http//example.com/hello.txt';
  expect(() => StringParams.decode(formatedString)).toThrow();

  formatedString =
    'firstOption' + spliterCharacter + 'http//example.com/hello.txt';
  expect(() => StringParams.decode(formatedString)).toThrow();
});
