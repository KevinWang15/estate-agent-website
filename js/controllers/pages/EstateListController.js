angular.module("estateAgent.controllers")
    .controller('EstateListController', function ($scope, $document) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.estates = null;

        $scope.filterChoices = {
            conditions: ["全新房", "毛坯房", "2年以下房龄", "5年以下房龄", "5-10年房龄", "10年以上房龄"]
        };

        $scope.filters = {
            city: "",
            district: "",
            zone: "",
            neighborhood: "",
            sortByPrice: 0,
            type: 0,
            keyword: "",
            priceLow: 0,
            priceHigh: 0,
            condition: ""
        };

        $scope.applyFilter = function () {
            $scope.estates = null;
            $scope.currentPage = 1;
            $scope.pageChanged();
        };

        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('estate-list', {
                page: $scope.currentPage,
                filters: $scope.filters
            }, {auth: false}).then(function (data) {
                if (data.errNo == 0) {
                    $scope.estates = data.list;
                    $scope.totalItems = data.totalItems;
                }
            });
        };

        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };
        $scope.pageChanged();
    });