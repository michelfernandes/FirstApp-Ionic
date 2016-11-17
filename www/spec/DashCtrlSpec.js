'use strict';

describe('Test', function() {
  it('testing', function() {
    expect(1).toBe(1);
  });
});

describe('DashCtrl', function() {
  var scope, $location, createController;

    beforeEach(inject(function ($controller, _$location_) {
        $location = _$location_;

        createController = function() {
            return $controller('DashCtrl', {
                '$scope': scope
            });
        };
    }));

  describe('scope showInformation', function() {
    it('Show information in alert popup', function() {
      //var controller = createController();
    });
  });
});
