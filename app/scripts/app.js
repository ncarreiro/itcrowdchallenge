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
    // 'ngTouch',
    // 'ngRoute',
    'ngMaterial',
    'ui.router',
    'angular-websql',
    angularDragula(angular)
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
  .run(function ($rootScope, $webSql) {
    $rootScope._ = window._;

    $rootScope.db = $webSql.openDatabase('tasksdb', '1.0', 'Tasks DB', 2 * 1024 * 1024);

    $rootScope.db.createTable('tasks', {
      'task_id': {
        'type': 'INTEGER',
        'null': 'NOT NULL', // default is 'NULL' (if not defined)
        'primary': true, // primary
        'auto_increment': true // auto increment
      },
      'task_description':{
        'type': 'TEXT',
        'null': 'NOT NULL'
      }
    });
  });
