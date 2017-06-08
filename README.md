# get-or-else

![Build status](https://api.travis-ci.org/benbowes/get-or-else.svg)
![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

Simple Get Or Else module written in JavaScript ES5.

Request an object property at a given namespace with a backup value, incase the desired namespace does not yield a result.

Useful if you have an untrustworthy or deeply nested data source. It will probably save you a bit of if, else-ery.

### Example ES5
```javascript
var get = require("get-or-else");

window.a = { x: 4 };

get([ window, 'a.b.c' ], {});
// returns {} as window.a.b.c does not exist, so `else` is used

get([ window, 'a' ], {});
// returns { x: 4 } as window.a does exist, so expected value is returned
```

### Example ES6 Redux
```javascript
import get from 'get-or-else';

export const name = (state = {}, action = {}) => {
  switch(action.type) {
    case 'SET_FIRSTNAME':
      return {
        ...state,
        firstName: get([ action, 'payload.name.first' ], undefined)
      };
    default:
      return state;
  }
};
```

### Example ES6 React
see this repo [get-or-else-demo](https://github.com/benbowes/get-or-else-demo)
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import get from 'get-or-else';

const nameObj = {
  details: {
    salutation: undefined,
    name: {
      first: 'Margaret'
    }
  }
};

const NameComponent = () => (
  <h1>
    Welcome {get([ nameObj, 'details.salutation' ], 'back')}
    <span> {get([ nameObj, 'details.name.first' ], '')}</span>
    <span> {get([ nameObj, 'details.name.last' ], '')}</span>
  </h1>
);

ReactDOM.render(
  <NameComponent />,
  document.getElementById('root')
);

/* NameComponent Renders `
<h1>
  Welcome back<span> Margaret</span><span></span>
</h1>`

nameObj.details.salutation does not exist so the backup value is used
nameObj.details.name.last does not exist so it does not display
*/
```

### NPM Package
[get-or-else](https://www.npmjs.com/package/get-or-else)

### Browser compatibility
IE 9 or greater - [Array.every on Mozilla's compatibility chart](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Browser_compatibility)

### Run the tests
Given you have [Node](https://nodejs.org/en/) installed, `cd` into this folder and:
```
npm install
npm test
```
