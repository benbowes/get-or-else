# get-or-else

![Build status](https://api.travis-ci.org/benbowes/get-or-else.svg)
![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

Simple Get Or Else module written in JavaScript ES5.

Request an object property at a given namespace with a backup value, incase the desired namespace does not yield a result.

Useful if you have an untrustworthy data source. It will probably save you a bit of if, else-ery.

### Example ES5
```javascript
var getOrElse = require("get-or-else");

window.a = {x:4};
getOrElse({ get: [window,'a.b.c'], else: {} });
// {} - does not exist, so `else` is used
getOrElse({ get: [window,'a'], else: {} })
// {x:4} - does exist, so expected value is returned
```

### Example ES6 Redux
```javascript
import getOrElse from 'get-or-else';

export const name = (state = {}, action = {}) => {

  switch(action.type) {

    case 'SET_NAME':
      return {
        ...state,
        name: getOrElse({ get: [action,'payload.name'], else: undefined })
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
import getOrElse from 'get-or-else';

const nameObj = {
  salutation: 'Mr',
  name: {
    first: 'James'
  }
};

const salutation = getOrElse({  get: [nameObj,'salutation'], else: false });

const NameComponent = () => {
  return (
    <h1>
      We have been expecting you

      {salutation && <span> {salutation}</span>}

      <span> {getOrElse({ get: [nameObj,'name.first'], else: '' })}</span>

      <span> {getOrElse({ get: [nameObj,'name.last'], else: '' })}</span>
    </h1>
  );
};

ReactDOM.render(<NameComponent />, document.getElementById('root'));

/* NameComponent Renders `
<h1>
  We have been expecting you
  <span> Mr</span>
  <span> James</span>
  <span></span>
</h1>`

nameObj.name.last does not exist so it does not display
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
