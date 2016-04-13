angular.module("estateAgent.controllers")
    .controller('AgentProposalsController', function ($scope, $stateParams, $state, $document, Notification) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.pageChanged = function () {
            $scope.scrollTop();

            api('agent-proposals-list', {
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

        function acceptOrRejectProposal(item, is_accepted) {
            api('agent-' + (is_accepted ? "accept" : "reject") + '-proposal', {id: item.id}, {
                auth: true,
                showLoading: true
            }).then(function (data) {
                if (data.errNo == 0) {
                    Notification.success("操作成功！");
                    $scope.pageChanged();
                }
            });
        }

        $scope.acceptProposal = function (item, $event) {
            $event.stopPropagation();
            acceptOrRejectProposal(item, true);
        };

        $scope.rejectProposal = function (item, $event) {
            $event.stopPropagation();
            acceptOrRejectProposal(item, false);
        };

        $scope.agentSetProposalState = function (item, $event, state) {
            $event.stopPropagation();
            api('agent-set-proposal-state', {id: item.id, state: state}, {
                auth: true,
                showLoading: true
            }).then(function (data) {
                if (data.errNo == 0) {
                    Notification.success("操作成功！");
                    $scope.pageChanged();
                }
            });
        };

        $scope.scrollTop = function () {
            $document.scrollTopAnimated(0, 500);
        };

        $scope.pageChanged();

        $scope.showEstateDetail = function (item) {
            if (item.state == 4) return;
            $state.go("index.estate-detail", {id: item.estate_id});
        };
    });