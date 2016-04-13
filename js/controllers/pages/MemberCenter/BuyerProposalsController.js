angular.module("estateAgent.controllers")
    .controller('BuyerProposalsController', function ($scope, $stateParams, $state, $document, Notification) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('buyer-proposals-list', {
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

        $scope.cancelItem = function (item, $event) {
            $event.stopPropagation();
            api('buyer-cancel-proposal', {id: item.id}, {auth: true, showLoading: true}).then(function (data) {
                if (data.errNo == 0) {
                    Notification.success("取消成功！");
                    $scope.pageChanged();
                }
            });
        };

        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };

        $scope.pageChanged();

        $scope.showEstateDetail = function (item) {
            if (item.state == 4) return;
            $state.go("index.estate-detail", {id: item.estate_id});
        };
    });