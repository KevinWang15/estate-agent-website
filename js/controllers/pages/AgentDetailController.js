angular.module("estateAgent.controllers")
    .controller('AgentDetailController', function ($scope, $stateParams) {
        api('get-agent-detail', {id: $stateParams.id}, {auth: false, showLoading: true}).then(function (data) {
            if (data.errNo == 0) {
                console.log(data);
                $scope.agent = data.agent;
                $scope.estates = data.estates;
            }
        });
    });