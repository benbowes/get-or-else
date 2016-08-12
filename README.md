# get-or-else

![Build status](https://api.travis-ci.org/benbowes/get-or-else.svg)

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

### Example ES6 React
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import getOrElse from 'get-or-else';

const data = { name: { first: 'James' }, salutation: 'Mr' };
const salutation = getOrElse({ get:[data,'salutation'], else:false });

const BaseComponent = () => {
  return (
    <h1>Hi
    {salutation && <span> {salutation} </span>}
    <span> {getOrElse({ get:[data,'name.first'], else:'' })}</span>
    <span> {getOrElse({ get:[data,'name.last'], else:'' })}</span>
    </h1>
  );
};

ReactDOM.render(<BaseComponent />, document.getElementById('root'));
// Renders `<h1>Hi<span> Mr </span><span>James</span><span></span></h1>`
// data.name.last does not exist so it does not display
```

### NPM Package
[get-or-else](https://www.npmjs.com/package/get-or-else)

### Browser compatibility
IE 9 or greater - [Array.every on Mozilla's compatibility chart](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Browser_compatibility)

### The Module

```javascript
/**
 * @param {Object} getOrElseObj
 * @param {Array} getOrElseObj.get
 * @param {Object} getOrElseObj.get[0] - the root object to your namespace.
 * e.g. this, window, someObj (Must exist).
 * @param {String} getOrElseObj.get[1] - a string representation of the namespace you
 * are targeting to get it's property. e.g. 'a.b.c.d'
 * @returns {Object} the item you hope for `get`, or a backup item `else` if it does not exist.
 * @example
 * GIVEN
 * window.a = {x:4}
 *
 * getOrElse({ get: [window,'a.b.c'], else: {} }) // {} - does not exist, so `else` is used
 * getOrElse({ get: [window,'a'], else: {} }) // {x:4} - does exist, so expected value is returned
 */

var getOrElse = function( getOrElseObj ) {
  if (!getOrElseObj.get[0]) return getOrElseObj.else;
  var contextObj = getOrElseObj.get[0];
  var namespace = getOrElseObj.get[1].split('.');
  var value = contextObj; // reassigns to obj[key] on each array.every iteration
  return (
    namespace.every( function( key ) {
      return (value = value[key]) != undefined
    })
  ) ? value : getOrElseObj.else;
};

module.exports = getOrElse;
```

### Run the tests
Given you have [Node](https://nodejs.org/en/) installed, `cd` into this folder and:
```
npm install
npm test
```
