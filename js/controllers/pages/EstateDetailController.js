angular.module("estateAgent.controllers")
    .controller('EstateDetailController', function ($scope, $rootScope, $stateParams, $state, $uibModal, $q, accountService, Notification) {
        api('get-estate-detail', {id: $stateParams.id}, {auth: false, showLoading: true}).then(function (data) {
            console.log(data);
            if (data.errNo == 0) {
                console.log(data);
                $scope.estate = data.estate;
                $scope.agents = data.agents;
                $scope.seller = data.seller;
            } else if (data.errNo == -5) {
                $state.go($rootScope.$previousState);
            }
        });

        $scope.newProposal = function (agent) {
            accountService.ensureLoggedIn().then(function () {
                if (window.user.user_type != 0) {
                    Notification.error("只有普通用户才能约中介看房哦！<br>请注册并登入普通用户。");
                    return;
                }

                var deferred = $q.defer();
                var _outerScope = $scope;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/modals/make-proposal.html',
                    controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                        $scope.agent = agent;
                        $scope.submit = function () {
                            if (confirm("确定要提交吗？")) {
                                $uibModalInstance.close(true);
                            }
                        };

                        $scope.closeModal = function () {
                            $uibModalInstance.close(false);
                        };
                    }],
                    size: 'lg'
                });

                modalInstance.result.then(function (data) {
                    if (data) {
                        api('make-proposal', {estate_id: $scope.estate.id, agent_id: agent.user.id}, {
                            auth: true,
                            showLoading: true
                        }).then(function (data) {
                            if (data.errNo == 0) {
                                Notification.success("恭喜，预约成功，中介会尽快联系您。");
                            }
                        });
                    }
                    ;
                });

                console.log(agent);
            });
        };
        $scope.showAgentDetail = function (id, $event) {
            $event.stopPropagation();
            $state.go("index.agent-detail", {id: id});
        };
    });