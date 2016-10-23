'use strict';

/**
 * @ngdoc function
 * @name itcrowdchallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itcrowdchallengeApp
 */
angular.module('itcrowdchallengeApp')
  .controller('MainCtrl', function ($scope, ServerInterface) {
    ServerInterface.getList().then(function () {
        ServerInterface.setList();
    });

    $scope.createTask = function (data) {
        ServerInterface.createTask(data);
    };

    $scope.updateList = function () {
        ServerInterface.getList();
    };

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