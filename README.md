[![Maintainability](https://api.codeclimate.com/v1/badges/d60ac6392b0647ff2ff6/maintainability)](https://codeclimate.com/github/gomez-git/js-ini-parser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d60ac6392b0647ff2ff6/test_coverage)](https://codeclimate.com/github/gomez-git/js-ini-parser/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/gomez-git/js-ini-parser/badge.svg)](https://snyk.io/test/github/gomez-git/js-ini-parser)
[![Node CI](https://github.com/gomez-git/js-ini-parser/actions/workflows/NodeCI.yml/badge.svg?branch=main)](https://github.com/gomez-git/js-ini-parser/actions/workflows/NodeCI.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Annotation
Simple parser from ini to javascript object. Some advantages:
* Zero Dependencies
* Size of index.js 2.45kB
* Native JS
* Prototype Pollution Protection
* Tested with jest and snyk
* Code style with ESLint by AirBnb and CodeClimate
## How to use
Install my package with:
```bash
npm install github:gomez-git/js-ini-parser

```
Try it in your project:
```javascript
import { readFileSync } from 'fs';
import parse from '@gomez-git/js-ini-parser';

const data = readFileSync('file.ini', 'utf-8');
const object = parse(data);
console.log(object);

```
## Example
### Input:
```ini
name=@gomez-git/js-ini-parser
version=0.0.4
private=true
description=Simple parser from ini to js object
main=index.js
type=module
keywords[]=ini
keywords[]=parser
author=Konstantin Kuzin
license=MIT

[some]
value = 12345
constructor[] = undefined

[.nested.example]
value = null

[__proto__]
keys = false

[.prototype]
toString='is not a function'

```
### Output:
```javascript
{
  name: '@gomez-git/js-ini-parser',
  version: '0.0.4',
  private: true,
  description: 'Simple parser from ini to js object',
  main: 'index.js',
  type: 'module',
  keywords: [
    'ini',
    'parser'
  ],
  author: 'Konstantin Kuzin'
  license: 'MIT',
  some: {
    value: 12345,
    nested: {
      example: {
        value: null,
      },
    },
  },
}

```
