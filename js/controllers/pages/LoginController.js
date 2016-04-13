angular.module("estateAgent.controllers")
    .controller('LoginController', function ($scope, $interval, Notification, accountService, $state) {

        $scope.formData = {
            mobile: "",
            password: ""
        };

        $scope.submit = function () {
            accountService.login($scope.formData.mobile, $scope.formData.password, true)
                .then(function () {
                    Notification.success('登入成功！');
                    $state.go("index.memberCenter");
                });
        };
    });