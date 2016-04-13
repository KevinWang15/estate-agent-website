angular.module("estateAgent.controllers")
    .controller('VerifySellerController', function ($scope, $stateParams, $document, Notification) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;


        $scope.pageChanged = function () {

            $scope.scrollTop();

            api('get-verify-seller-list', {
                page: $scope.currentPage
            }, {auth: true, showLoading: true}).then(function (data) {
                if (data.errNo == 0) {
                    console.log(data);
                    $scope.list = data.list;
                    $scope.totalItems = data.totalItems
                }
            });
        };

        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };

        $scope.verifyItem = function (item, $event) {
            $event.stopPropagation();
            if (confirm("确定要通过？")) {
                api('verify-seller', {id: item.id}, {auth: true, showLoading: true}).then(function (data) {
                    if (data.errNo == 0) {
                        Notification.success("恭喜，通过成功！");
                        $scope.pageChanged();
                    }
                });
            }
        };

        $scope.pageChanged();

    });