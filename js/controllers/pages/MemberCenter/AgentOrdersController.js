angular.module("estateAgent.controllers")
    .controller('AgentOrdersController', function ($scope, $stateParams, $state, $document, Notification) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('agent-orders-list', {
                page: $scope.currentPage
            }, {auth: true, showLoading: true}).then(function (data) {
                if (data.errNo == 0) {
                    console.log(data);
                    $scope.list = data.list;
                    //if (!$scope.totalItems)
                    $scope.totalItems = data.totalItems;
                }
            });
        };

        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };

        $scope.pageChanged();
    });