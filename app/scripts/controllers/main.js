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
    // Getting Tasks List
    Api.getList().then(function () {
      Api.setList();
    });

    // Create Task
    $scope.createTask = function (data) {
      Api.createTask(data);
    };

    // Update Task
    $scope.updateTask = function (data) {
      Api.updateTask(data);
    };

    // Delete Task
    $scope.deleteTask = function (data) {
      Api.deleteTask(data);
    };

    // Delete All Tasks
    $scope.deleteAllTasks = function () {
      Api.deleteAllTasks();
    };

    // Dragula Options and $scopes
    dragulaService.options($scope, 'tasks-list', {
      moves: function (el, container, handle) {
      return handle.className === 'handle';
      }
    });

    $scope.$on('task-item.drag', function (e, el) {
      el.removeClass('moved');
    });

    $scope.$on('task-item.drop', function (e, el) {
      el.addClass('moved');
    });

    $scope.$on('task-item.over', function (e, el, container) {
      container.addClass('over');
    });

    $scope.$on('task-item.out', function (e, el, container) {
      container.removeClass('over');
    });
  });