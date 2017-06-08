var expect = require('expect');
var get = require('./index');

var testObj = {
  a: 1,
  b: {
    p: null,
    x: 3,
    y: {
      z: 56
    }
  }
};

describe('get-or-else', function(){

  it('should return the backup param, when the desired namespace cannot be found', function(){
    var result = get([testObj, 'a.b.c.d'], {});
    expect(result).toEqual({});
  });

  it('should return the desired object, if it exists', function(){
    var result = get([testObj, 'b.y.z'], 0);
    expect(result).toEqual(56);
  });

  it('should consider a `null` property to not be desirable, so will return backup value', function(){
    var result = get([testObj, 'b.p'], '');
    expect(result).toEqual('');
  });

  it('should return a whole object if that is what is what is desired and it exists', function(){
    var result = get([testObj, 'b'], { f: ''});
    expect(result).toEqual({p: null, x: 3, y: {z:56} });
  });

  it('should return backup value if contextObj is undefined', function(){
    var n = undefined;
    var result = get([n,'b'], 'nopes');
    expect(result).toEqual('nopes');
  });

});
