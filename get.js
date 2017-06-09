/**
 * @param {Array} get - the namespace including 2 parts as follows...
 * @param {Object} get[0] - the root object to your namespace.
 * e.g. this, window, someObj (Must exist).
 * @param {String} get[1] - a string representation of the namespace you
 * are targeting to get it's property. e.g. 'a.b.c.d'
 * @param {Any type of object} backup - the backup value to return if the requested namespace does not yeild a result
 * @returns the item you hope to get from your namespace, or the backup item if it does not exist.
 * @example
 *
 * GIVEN
 * window.a = {x:4}
 *
 * get([window, 'a.b.c'], ':/')
 * // => ':/' - namespace does not exist, so backup value is used
 *
 * get([window,'a'], {})
 * // => {x:4} - namespace exists so expected value is returned
 */

// @t "handles empty context"       get([undefined, 'foo.bar'], 'tada') equals 'tada'
// @t "handles invalid path"        get([{'foo': 'bar'}, 'foo.baz'], 'tada') equals 'tada'
// @t "handle corrent param"        get([{'foo': 'bar'}, 'foo'], 'tada') equals 'bar'
// @t "handles objects"             get([{'foo': {'bar': 'baz'}}, 'foo'], 'tada') deep-equals {'bar': 'baz'}
// @t "handles dungeons deep"       get([{'dungeons': {'deep': {'caverns': 'old'}}}, 'dungeons.deep.caverns'], 'never') equals 'old'
var get = function( get, backup ) {
  var contextObjext = get[0];
  if (!contextObjext) return backup;
  var namespace = get[1].split('.');
  var value = contextObjext;
  // reassigns to obj[key] on each array.every iteration
  return ( namespace.every( function(key){ return (value = value[key]) != undefined; }) )
    ? value
    : backup;
};

module.exports = {
  get: get,
};
