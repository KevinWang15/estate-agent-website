angular.module('estateAgent.controllers')
    .controller('NavbarController', function ($document, $scope, MiddlewareService, Notification, $state, $window, $rootScope, $interval, $timeout, accountService) {
        $scope.dropdownShown = false;
        $scope.account = accountService;
        $scope.$window = window;
        $scope.toggleDropdown = function () {
            $scope.dropdownShown = !$scope.dropdownShown;
        };

        $scope.logout = function () {
            accountService.logout();
        };

        $scope.hideDropdown = function () {
            $timeout(function () {
                $scope.dropdownShown = false;
            })
        };

        $scope.gotoMemberCenter = function () {
            $state.go('index.memberCenter', {activePage: 0});
        };

    });