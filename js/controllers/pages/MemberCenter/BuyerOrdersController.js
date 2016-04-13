angular.module("estateAgent.controllers")
    .controller('BuyerOrdersController', function ($scope, $stateParams, $state, $document, Notification) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.buyerSetOrderState = function (item, $event, state) {
            $event.stopPropagation();
            if (confirm("确定吗？")) {

                api('buyer-set-order-state', {id: item.id, state: state}, {
                    auth: true,
                    showLoading: true
                }).then(function (data) {
                    if (data.errNo == 0) {
                        Notification.success("操作成功！");
                        $scope.pageChanged();
                    }
                });
            }
        };
        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('buyer-orders-list', {
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