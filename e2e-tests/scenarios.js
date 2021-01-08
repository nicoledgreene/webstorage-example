'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /localStorage when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/localStorage");
  });


  describe('localStorage', function() {

    beforeEach(function() {
      browser.get('index.html#!/localStorage');
    });


    it('should render localStorage when user navigates to /localStorage', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('sessionStorage', function() {

    beforeEach(function() {
      browser.get('index.html#!/sessionStorage');
    });


    it('should render sessionStorage when user navigates to /sessionStorage', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
