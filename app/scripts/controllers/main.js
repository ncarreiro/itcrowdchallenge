'use strict';

/**
 * @ngdoc function
 * @name itcrowdchallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itcrowdchallengeApp
 */
angular.module('itcrowdchallengeApp')
  .controller('MainCtrl', function ($scope, _) {
    console.log(_.toUpper('Blah'));

    $scope.taskList = [
        {
            id: 1,
            title: 'Prueba 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 2,
            title: 'Prueba 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 3,
            title: 'Prueba 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 4,
            title: 'Prueba 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 5,
            title: 'Prueba 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 6,
            title: 'Prueba 6',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidtat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ];

    $scope.$on('task-item.drag', function (e, el) {
        console.log(el);
        el.removeClass('moved');
    });

    $scope.$on('task-item.drop', function (e, el) {
        console.log(el);
        el.addClass('moved');
    });

    $scope.$on('task-item.over', function (e, el, container) {
        console.log(container);
        container.addClass('over');
    });

    $scope.$on('task-item.out', function (e, el, container) {
        console.log(container);
        container.removeClass('over');
    });
  });