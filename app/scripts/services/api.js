(function () {
'use strict';

/**
 * @ngdoc function
 * @name itcrowdchallengeApp.service:Api
 * @description
 * # Api
 */
 /*jshint latedef: nofunc */

angular.module('itcrowdchallengeApp')
  .service('Api', Api);

function Api($rootScope, $webSql, $mdToast, _) {
  // Creating global vars
  var id, task;

  var Service = function () {};

  Service.prototype.getList = function () {
    // Getting Tasks List from tasks DB table
    var list = $rootScope.db.selectAll('tasks').then(function(results) {
      return results;
    });

    return list;
  };

  Service.prototype.setList = function () {
    // Checking if taskList array is created
    if (!$rootScope.taskList) {
      $rootScope.taskList = [];
    }

    Service.prototype.getList().then(function (response) {
      // Push all elements of DB table to list
      _.forEach(response.rows, function (task) {
        $rootScope.taskList.push(task);
      });
    });

    return true;
  };

  Service.prototype.createTask = function (data) {
    // Checking if !data or if there is a task description
    if (!data || data && !data.task_description) {
      $rootScope.error = 'Please, enter the task description.';
      return false;
    }

    // Getting Tasks list in DB
    Service.prototype.getList().then(function (response) {
      if (response) {
        // Check for duplicated task
        var checkDuplicated = _.find(response.rows, {'task_description': data.task_description});

        if (checkDuplicated) {
          $rootScope.error = 'You already have one task with that description.';

          return false;
        }
      }

      // Delete create task input error message
      delete $rootScope.error;

      // Getting task ID max value in DB
      _.maxBy(response.rows, function (item) {
        id = item.task_id;
      });

      if (!id) {
        id = 0;
      }

      // Creating task object with information
      task = {
        'task_id': id + 1,
        'task_description': data.task_description
      };

      // Inserting new task to DB table
      $rootScope.db.insert('tasks', task);

      // Pushing new task to view list
      $rootScope.taskList.push(task);

      // Success toast
      $mdToast.show(
        $mdToast.simple()
        .textContent('Task created!')
        .position('top')
      );
    });

    return true;
  };

  Service.prototype.updateTask = function (data) {
    // Checking if trying to save blank description
    if (data && !data.task_description) {
      return $mdToast.show(
        $mdToast.simple()
          .textContent('You can\'t save a blank task!.')
          .position('top')
          .hideDelay(3000)
      );
    }

    // Updating value to task in DB table
    $rootScope.db.update('tasks', {'task_description': data.task_description}, {'task_id': data.task_id});

    // Success Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('Task updated!')
      .position('top')
      .hideDelay(3000)
    );

    return true;
  };

  Service.prototype.deleteTask = function (data) {
    // Creating task object with data information
    task = {
      'task_id': data.task_id,
      'task_description': data.task_description
    };

    // Deleting task from DB table
    $rootScope.db.del('tasks', {'task_id': task.task_id});

    // Deleting task from view table
    $rootScope.taskList = _.remove($rootScope.taskList,  function(item) {
      return item.task_id !== task.task_id;
    });

    // Success Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('Task deleted!')
      .position('top')
      .hideDelay(3000)
    );

    return true;
  };

  return new Service();
}

})();