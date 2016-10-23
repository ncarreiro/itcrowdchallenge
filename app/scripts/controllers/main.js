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
  });