angular.module("estateAgent.controllers")
    .controller('MemberCenterController', function ($scope, $window, accountService, $document, $timeout, $state, $stateParams) {
        $scope.activePage = 0;
        $scope.$window = window;
        function doScroll() {
            var off = $scope.$on('$includeContentLoaded', function (event, args) {
                off();
                $scope.triggerSlideUp();
            });
        }

        $scope.triggerSlideUp = function () {
            $timeout(function () {
                if ($window.innerWidth <= 974)
                    $document.scrollTopAnimated(document.getElementsByClassName('mainForm')[0].offsetTop - 164, 400);
            }, 300);
        };

        $scope.$on('triggerSlideUp', function () {
            $scope.triggerSlideUp();
        });

        $scope.setActivePage = function (id) {
            if (id >= 0) {
                if ($scope.pages[id].type == 'logout') {
                    accountService.logout();
                } else {
                    $state.go('index.memberCenter', {activePage: id});
                }
                doScroll();
            } else {
                $scope.activePage = id;
            }
        };

        $scope.pages = [
            {
                title: "我的账户",
                subtitle: "查看我的账户",
                template: "templates/pages/member-center/account-info.html"
            },
            {
                title: "我的房产",
                subtitle: "查看/添加我的房产",
                template: "templates/pages/member-center/my-estates.html",
                user_type: 1
            },
            {
                title: "审核提供商",
                subtitle: "审核新的提供商",
                template: "templates/pages/member-center/verify-seller.html",
                user_type: 2
            },
            {
                title: "审核房产信息",
                subtitle: "审核新的房产信息",
                template: "templates/pages/member-center/verify-estate.html",
                user_type: 2
            },
            {
                title: "预定单",
                subtitle: "查看我的预定单",
                template: "templates/pages/member-center/buyer-proposals.html",
                user_type: 0
            },
            {
                title: "交易单",
                subtitle: "查看我的交易单",
                template: "templates/pages/member-center/buyer-orders.html",
                user_type: 0
            },
            {
                title: "交易单",
                subtitle: "查看我的交易单",
                template: "templates/pages/member-center/seller-orders.html",
                user_type: 1
            },
            {
                title: "预定单",
                subtitle: "客户的的预定单",
                template: "templates/pages/member-center/agent-proposals.html",
                user_type: 2
            },
            {
                title: "交易单跟进",
                subtitle: "与我有关的交易单",
                template: "templates/pages/member-center/agent-orders.html",
                user_type: 2
            },
            {
                title: "退出登入",
                subtitle: "",
                type: 'logout'
            }
        ];


        if (!!$stateParams.activePage) {
            $scope.activePage = $stateParams.activePage;
            doScroll();
        }

    });