angular.module('estateAgent.directives')
    .directive('zoneSelect',
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/zone-select.html',
                scope: {
                    result: '='
                },
                link: function (scope, element, attr) {

                    scope.choices = {
                        cities: ["上海", "北京", "广州"],
                        districts: {
                            "上海": ["闵行区", "宝山区", "浦东新区"],
                            "北京": ["东城区", "西城区", "海淀区"],
                            "广州": ["海珠区", "天河区"]
                        },
                        zones: ["Zone 1", "Zone 2", "Zone 3"],
                        neighborhoods: ["Neighborhood 1", "Neighborhood 2", "Neighborhood 3"]
                    };

                    scope.chooseCity = function (city) {
                        if (!city) city = "";
                        scope.result.city = city;
                        scope.result.district = "";
                        scope.result.zone = "";
                        scope.result.neighborhood = "";
                    };

                    scope.chooseDistrict = function (district) {
                        if (!district) district = "";
                        scope.result.district = district;
                        scope.result.zone = "";
                        scope.result.neighborhood = "";
                    };

                    scope.chooseZone = function (zone) {
                        if (!zone) zone = "";
                        scope.result.zone = zone;
                        scope.result.neighborhood = "";
                    };

                    scope.chooseNeighborhood = function (neighborhood) {
                        if (!neighborhood) neighborhood = "";
                        scope.result.neighborhood = neighborhood;
                    };
                }
            }
        });
