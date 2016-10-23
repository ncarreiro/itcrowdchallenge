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
        var list = $rootScope.db.selectAll('tasks').then(function(results) {
            return results;
        });

        return list;
    };

    Service.prototype.setList = function () {
        if (!$rootScope.taskList) {
            $rootScope.taskList = [];
        }

        this.getList().then(function (response) {
            _.forEach(response.rows, function (task) {
                $rootScope.taskList.push(task);
            });
        });

        return true;
    };

    Service.prototype.updateList = function (task) {
        $rootScope.taskList.push(task);
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

        var task = {
            'task_id': id + 1,
            'task_description': data.description
        };

        $rootScope.db.insert('tasks', task);

        this.updateList(task);

        return true;
    };

    Service.prototype.deleteTask = function () {
        return true;
    };

    return new Service();
}

})();