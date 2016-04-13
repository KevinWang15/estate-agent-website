angular.module("estateAgent.controllers")
    .controller('SellerDetailController', function ($scope, $stateParams) {
        api('get-seller-detail', {id: $stateParams.id}, {auth: false, showLoading: true}).then(function (data) {
            if (data.errNo == 0) {
                console.log(data);
                $scope.seller = data.seller;
                $scope.estates = data.estates;
            }
        });
    });