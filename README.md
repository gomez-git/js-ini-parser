[![Maintainability](https://api.codeclimate.com/v1/badges/d60ac6392b0647ff2ff6/maintainability)](https://codeclimate.com/github/gomez-git/js-ini-parser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d60ac6392b0647ff2ff6/test_coverage)](https://codeclimate.com/github/gomez-git/js-ini-parser/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/gomez-git/js-ini-parser/badge.svg)](https://snyk.io/test/github/gomez-git/js-ini-parser)
[![Node CI](https://github.com/gomez-git/js-ini-parser/actions/workflows/NodeCI.yml/badge.svg?branch=main)](https://github.com/gomez-git/js-ini-parser/actions/workflows/NodeCI.yml)
# Annotation
Simple parser from ini to javascript object. Some advantages:
* Zero Dependencies
* Size of index.js 1.9kB
* Native JS
* Prototype Pollution Protection
* Tested with jest and snyk
* Code style with ESLint by AirBnb and CodeClimate
## How to use
Install my package with:
```bash
npm install https://github.com/gomez-git/js-ini-parser
```
Try it in your project:
```javascript
import { readFileSync } from 'fs';
import parse from '@gomez-git/js-ini-parser';

const data = readFileSync('file.ini', 'utf8');
const object = parse(data);
console.log(object);
```
## Example
### Input:
```ini
[common]
follow=false
setting1=Value 1
setting3=null
setting4=blah blah
; hello
[.setting5]
key5 = value5
# world
[common.setting6]
key=value
ops=vops

[common.setting6.doge]
wow = so much

[prototype]
keys=null

[.hello]
wow=not

[group1]
foo=bar
baz=bars
nest=str

[group3]
fee=100500

[.deep.id]
number=45
__proto__ = false

[constructor.hell]
toSrting=false
```
### Output:
```javascript
{
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5'
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much'
      }
    }
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str'
  },
  group3: {
    fee: 100500,
    deep: {
      id: {
        number: 45
      }
    }
  }
}
```
