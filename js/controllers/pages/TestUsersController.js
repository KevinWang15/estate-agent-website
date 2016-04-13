angular.module("estateAgent.controllers")
    .controller('TestUsersController', function ($scope, $stateParams) {
        api('get-all-test-users', {}, {auth: false, showLoading: true}).then(function (data) {
            if (data.errNo == 0) {
                $scope.list = data.list;
            }
        });
    });