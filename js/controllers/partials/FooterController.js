angular.module('estateAgent.controllers')
    .controller('FooterController', function ($scope, $document, Notification) {
        $scope.formData = {email: ""};
        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };
        $scope.subscribe = function () {
            if (!util.isEmail($scope.formData.email)) {
                Notification.error('Email地址无效');
                return;
            }
            Notification.success("Ooops.. 不要太认真");
        }
    });