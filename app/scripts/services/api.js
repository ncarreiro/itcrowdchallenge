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
    var id, task;

    var Service = function () {};

    Service.prototype.getList = function () {
        var list = $rootScope.db.selectAll('tasks').then(function(results) {
            return results;
        });

        return list;
    };

    Service.prototype.setList = function () {
        if (!$rootScope.taskList) {
            $rootScope.taskList = [];
        }

        Service.prototype.getList().then(function (response) {
            _.forEach(response.rows, function (task) {
                $rootScope.taskList.push(task);
            });
        });

        return true;
    };

    Service.prototype.createTask = function (data) {
        if (!data || data && !data.task_description) {
            $rootScope.error = 'Please, enter the task description.';
            return false;
        }

        Service.prototype.getList().then(function (response) {
            delete $rootScope.error;

            if (response) {
                // Check for duplicated task
                var checkDuplicated = _.find(response.rows, {'task_description': data.task_description});

                console.log(checkDuplicated);

                if (checkDuplicated) {
                    $rootScope.error = 'You already have one task with that description.';

                    return false;
                }
            }

            // Get max task ID value
            _.maxBy(response.rows, function (item) {
                id = item.task_id;
            });

            if (!id) {
                id = 0;
            }

            task = {
                'task_id': id + 1,
                'task_description': data.task_description
            };

            $rootScope.db.insert('tasks', task);

            $rootScope.taskList.push(task);

            $mdToast.show(
              $mdToast.simple()
                .textContent('Task created!')
                .position('top')
            );
        });

        return true;
    };

    Service.prototype.updateTask = function (data) {
        $rootScope.db.update('tasks', {'task_description': data.task_description}, {'task_id': data.task_id});

        $mdToast.show(
          $mdToast.simple()
            .textContent('Task updated!')
            .position('top')
            .hideDelay(3000)
        );

        return true;
    };

    Service.prototype.deleteTask = function (data) {
        task = {
            'task_id': data.task_id,
            'task_description': data.task_description
        };

        $rootScope.db.del('tasks', {'task_id': task.task_id});

        console.log($rootScope.taskList);

        $rootScope.taskList = _.remove($rootScope.taskList,  function(item) {
            return item.task_id !== task.task_id;
        });

        console.log($rootScope.taskList);

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