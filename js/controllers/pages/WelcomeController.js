angular.module("estateAgent.controllers")
    .controller('WelcomeController', function ($scope) {
        $scope.refreshRecommendation = function () {
            api('get-random-recommendations', {}, {auth: false, showLoading: true}).then(function (data) {
                if (data.errNo == 0) {
                    $scope.recommended = data.list;
                }
            });
        };

        $scope.refreshRecommendation();
    });