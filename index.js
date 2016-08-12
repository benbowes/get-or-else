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
 * getOrElse({ get: [window,'a.b.c'], else: ':/' }) // ':/' - does not exist, so `none` is used
 * getOrElse({ get: [window,'a'], else: {} }) // {x:4} - does exist, so expected value is returned
 */

var getOrElse = function( getOrElseObj ) {
  if (!getOrElseObj.get[0]) return getOrElseObj.else;
  var contextObj = getOrElseObj.get[0];
  var namespace = getOrElseObj.get[1].split('.');
  var value = contextObj; // reassigns to obj[key] on each array.every iteration
  return (
    namespace.every( function( key ) {
      return (value = value[key]) != undefined;
    })
	) ? value : getOrElseObj.else;
};

module.exports = getOrElse;
