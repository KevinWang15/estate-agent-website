angular.module('estateAgent.controllers', []);
angular.module('estateAgent.services', []);
angular.module('estateAgent.directives', []);
angular.module('estateAgent.filters', []);

angular.module('estateAgent',
    ['estateAgent.controllers', 'estateAgent.services', 'estateAgent.directives', 'estateAgent.filters', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'duScroll', 'ui-notification'])
    .run(function (UtilService, api, MiddlewareService, $rootScope, accountService, $timeout) {
        MiddlewareService.guard();
        accountService.loadToken();
        $rootScope.menuOpened = false;

        $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
        });

    }).config(function ($touchProvider, NotificationProvider, uibDatepickerPopupConfig, uibDatepickerConfig) {
    NotificationProvider.setOptions({
        delay: 4000,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'top',
        startTop: 40
    });
    $touchProvider.ngClickOverrideEnabled(true);
});

