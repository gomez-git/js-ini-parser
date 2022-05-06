import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.ini', 'expected1.json'],
  ['file2.ini', 'expected2.json'],
  ['file3.ini', 'expected3.json'],
])('parse %s', (filename1, filename2) => {
  const file = readFile(filename1);
  const actualValue = parse(file);
  const expectedValue = JSON.parse(readFile(filename2));

  expect(actualValue).toEqual(expectedValue);
});
