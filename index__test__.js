var expect = require('expect');
var getOrElse = require('./index');

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

describe('getOrElse', function(){

  it('should return the default `else` param, when the desired `get` object cannot be found', function(){
    var result = getOrElse([testObj, 'a.b.c.d'], {});
    expect(result).toEqual({});
  });

  it('should return the desired object, if it exists', function(){
    var result = getOrElse([testObj, 'b.y.z'], 0);
    expect(result).toEqual(56);
  });

  it('should consider a `null` property to not be desirable, so will return `else` value', function(){
    var result = getOrElse([testObj, 'b.p'], '');
    expect(result).toEqual('');
  });

  it('should return a whole object if that is what is what is desired and it exists', function(){
    var result = getOrElse([testObj, 'b'], { f: ''});
    expect(result).toEqual({p: null, x: 3, y: {z:56} });
  });

  it('should return `else` value if contextObj is undefined', function(){
    var n = undefined;
    var result = getOrElse([n,'b'], 'nopes');
    expect(result).toEqual('nopes');
  });

});
