angular.module('estateAgent.services').service('MiddlewareService',
    function ($http, $q, $rootScope, Notification, accountService, $state, $document) {
        this.authGuard = ['index.memberCenter'];

        var self = this;
        this.mustHaveToken = function (event) {
            if (!accountService.hasToken(event)) {
                Notification.error('请先登入');
                $state.go('index.login');
                event.preventDefault();
                return false;
            }
            return true;
        };

        this.guard = function () {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $document.scrollTopAnimated(0, 300);
                if (self.authGuard.indexOf(toState.name) >= 0) {
                    self.mustHaveToken(event);
                }
            })
        };

        $rootScope.middleware = window.middleware = this;
    });