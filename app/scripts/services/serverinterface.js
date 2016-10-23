(function () {
'use strict';

/**
 * @ngdoc function
 * @name itcrowdchallengeApp.service:ServerInterface
 * @description
 * # ServerInterface
 */
 /*jshint latedef: nofunc */

angular.module('itcrowdchallengeApp')
    .service('ServerInterface', ServerInterface);

function ServerInterface($rootScope, $webSql, _) {
    var Service = function () {};

    Service.prototype.getList = function () {
        $rootScope.taskList = [];

        var list = $rootScope.db.selectAll('tasks').then(function(results) {
            return results;
        });

        return list;
    };

    Service.prototype.setList = function () {
        this.getList().then(function (response) {
            _.forEach(response.rows, function (task) {
                $rootScope.taskList.push(task);
            });
        });

        return true;
    };

    Service.prototype.createTask = function (data) {
        var id;

        if (!data) {
            $rootScope.error = 'Debe completar los datos';
            return false;
        }

        this.getList().then(function (response) {
            if (!response) {
                return id = 0;
            }

            return id = response.rows.length;
        });

        $rootScope.db.insert('tasks', {'task_id': id + 1, 'task_description': data.description});

        this.setList();

        return true;
    };

    Service.prototype.deleteTask = function () {
        return true;
    };

    return new Service();
}

})();