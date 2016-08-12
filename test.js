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

  it('should return the default `none` param, when the desired `some` object cannot be found', function(){
    var result = getOrElse({ some: [testObj,'a.b.c.d'], none:{} });
    expect(result).toEqual({});
  });

  it('should return the desired object, if it exists', function(){
    var result = getOrElse({ some: [testObj,'b.y.z'], none:0 });
    expect(result).toEqual(56);
  });

  it('should consider a `null` property to not be desirable, so will return `none` value', function(){
    var result = getOrElse({ some: [testObj,'b.p'], none:'' });
    expect(result).toEqual('');
  });

  it('should return a whole object if that is what is what is desired and it exists', function(){
    var result = getOrElse({ some: [testObj,'b'], none:{ f:''} });
    expect(result).toEqual({p:null,x:3,y:{z:56}});
  });

});
