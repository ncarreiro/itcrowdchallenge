'use strict';

/**
 * @ngdoc overview
 * @name itcrowdchallengeApp
 * @description
 * # itcrowdchallengeApp
 *
 * Main module of the application.
 */
angular
  .module('itcrowdchallengeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    // 'ngRoute',
    'ui.router'
  ])
  // lodash support
  .factory('_', ['$window',
    function($window) {
      return $window._;
    }
  ])
  // .constant('_', window._)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });

    $urlRouterProvider
      .when('', '/');

    $urlRouterProvider.otherwise('/');
  })
  .run(function ($rootScope, _) {
    $rootScope._ = window._;
  });
