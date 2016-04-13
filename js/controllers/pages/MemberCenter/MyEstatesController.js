angular.module("estateAgent.controllers")
    .controller('MyEstatesController', function ($scope, $stateParams, $state, $document, Notification) {

        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.$window = window;


        $scope.conditionChoices = ["全新房", "毛坯房", "2年以下房龄", "5年以下房龄", "5-10年房龄", "10年以上房龄"];
        $scope.formShown = false;
        $scope.formData = {};

        $scope.showNewEstate = function () {
            $scope.formShown = true;
            $scope.formData.id = 0;
        };

        $scope.editItem = function (item, $event) {
            $event.stopPropagation();
            //$scope.formData.id = item.id;
            $scope.formData = angular.copy(item);
            console.log(item);
            $scope.formShown = true;
        };


        $scope.discardForm = function () {
            if (confirm('您确定要取消编辑？')) {
                $scope.formData = {};
                $scope.formShown = false;
            }
        };

        $scope.submitForm = function () {

            if (!$scope.formData.city) {
                Notification.error("请选择所在城市!");
                return;
            }

            if (!$scope.formData.district) {
                Notification.error("请选择行政区!");
                return;
            }

            if (!$scope.formData.zone) {
                Notification.error("请选择商圈!");
                return;
            }

            if (!$scope.formData.neighborhood) {
                Notification.error("请选择小区!");
                return;
            }

            if (!$scope.formData.room) {
                Notification.error("请填写房间号!");
                return;
            }

            if ($scope.formData.condition == null) {
                Notification.error("请选择房屋属性!");
                return;
            }
            if ($scope.formData.description == null) {
                Notification.error("请填写设施描述!");
                return;
            }
            if ($scope.formData.price == null) {
                Notification.error("请填写售价!");
                return;
            }
            if (!window.util.isNumeric($scope.formData.price)) {
                Notification.error("售价必须为数字!");
                return;
            }
            if (+($scope.formData.price) < 0) {
                Notification.error("售价不能小于0!");
                return;
            }
            if ($scope.formData.is_for_rent == null) {
                Notification.error("请选择是出租还是出售!");
                return;
            }

            if (!$scope.formData.id) $scope.formData.id = 0;

            if (confirm('您确定要提交？')) {
                api('edit-estate', $scope.formData, {auth: true, showLoading: true}).then(function (data) {
                    if (data.errNo == 0) {
                        Notification.success("恭喜，提交成功！");
                        $scope.pageChanged();
                        $scope.formData = {};
                        $scope.formShown = false;
                    }
                });
            }
        };

        $scope.removeItem = function (item, $event) {
            $event.stopPropagation();
            if (confirm('您确定要撤销吗？撤销后如果想撤销，需要手动重新添加')) {
                api('hide-my-estate',
                    {id: item.id},
                    {auth: true, showLoading: true}
                ).then(function (data) {
                    if (data.errNo == 0) {
                        Notification.success("撤销成功");
                        $scope.pageChanged();
                    }
                });
            }

        };

        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('get-my-estates-list', {
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

        $scope.showItemDetail = function (item) {
            if (!item.verified) {
                Notification.error("只有在通过审核之后才能看房产详情！");
            } else {
                $state.go("index.estate-detail", {id: item.id});
            }
        };

        $scope.pageChanged();

    });