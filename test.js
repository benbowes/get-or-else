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
    var result = getOrElse({ get: [testObj,'a.b.c.d'], else:{} });
    expect(result).toEqual({});
  });

  it('should return the desired object, if it exists', function(){
    var result = getOrElse({ get: [testObj,'b.y.z'], else:0 });
    expect(result).toEqual(56);
  });

  it('should consider a `null` property to not be desirable, so will return `else` value', function(){
    var result = getOrElse({ get: [testObj,'b.p'], else:'' });
    expect(result).toEqual('');
  });

  it('should return a whole object if that is what is what is desired and it exists', function(){
    var result = getOrElse({ get: [testObj,'b'], else:{ f:''} });
    expect(result).toEqual({p:null,x:3,y:{z:56}});
  });

  it('should return `else` value if contextObj is undefined', function(){
    var n = undefined;
    var result = getOrElse({ get: [n,'b'], else:'nopes' });
    expect(result).toEqual('nopes');
  });

});
