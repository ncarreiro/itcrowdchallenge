'use strict';

describe('Service: serverInterface', function () {

  // load the service's module
  beforeEach(module('itcrowdchallengeApp'));

  // instantiate service
  var serverInterface;
  beforeEach(inject(function (_serverInterface_) {
    serverInterface = _serverInterface_;
  }));

  it('should do something', function () {
    expect(!!serverInterface).toBe(true);
  });

});
