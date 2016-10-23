'use strict';

/**
 * @ngdoc function
 * @name itcrowdchallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itcrowdchallengeApp
 */
angular.module('itcrowdchallengeApp')
  .controller('MainCtrl', function ($scope, Api, dragulaService) {
    Api.getList().then(function () {
        Api.setList();
    });

    $scope.createTask = function (data) {
        Api.createTask(data);
    };

    $scope.updateTask = function (data) {
        Api.updateTask(data);
    };

    $scope.deleteTask = function (data) {
        Api.deleteTask(data);
    };

    dragulaService.options($scope, 'tasks-list', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });

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