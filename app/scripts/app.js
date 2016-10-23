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
    angularDragula(angular) // jshint ignore:line
  ])
  // lodash Global Support
  .factory('_', ['$window',
    function($window) {
      return $window._;
    }
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    // Setting up UI-Router
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
    // Setting global $rootScope._ for lodash Support in Views
    $rootScope._ = window._;

    // Creating WebSQL Database with $webSQL
    $rootScope.db = $webSql.openDatabase('tasksdb', '1.0', 'Tasks DB', 2 * 1024 * 1024);

    // Creating Tasks List Table with $webSQL
    $rootScope.db.createTable('tasks', {
      'task_id': {
        'type': 'INTEGER',
        'null': 'NOT NULL',
        'primary': true,
        'auto_increment': true
      },
      'task_description':{
        'type': 'TEXT',
        'null': 'NOT NULL'
      }
    });
  });
