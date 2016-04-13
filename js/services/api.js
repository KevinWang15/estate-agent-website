angular.module('estateAgent.services').factory('api',
    function ($http, $q, accountService, $state,$document, Notification, $rootScope) {
        var self = this;

        var api = function (apiName, params, config) {
            var deferred = $q.defer();
            var url = window.API_BASE + apiName;

            if (apiName.startsWith("^"))
                url = apiName.substring(1);

            //设置config的默认值
            if (!config) config = {};

            config = angular.extend({
                'showLoading': false,
                'showErrorMsg': true,
                'auth': false
            }, config);


            if (config.showLoading) {
                util.showSpin();
            }

            var _headers = {'Content-Type': 'application/json'};

            if (config.auth === 'optional') {
                if (!!window.user && !!window.user.token)
                    _headers['token'] = window.user.token;
                else  _headers['token'] = 'guest';
            }

            if (config.auth === true && !window.user && config.showLoading) util.hideSpin();
            if (config.auth === true && !accountService.hasToken()) {
                Notification.error('您需要登入后才能进行本操作。');
                return $q.reject();
            }
            if (config.auth === true && window.user)
                _headers['token'] = window.user.token;

            var httpPromise = $http({
                method: 'POST',
                url: url,
                data: params,
                headers: _headers
            });

            httpPromise.then(function (rsp) {
                if (config.showLoading) util.hideSpin();

                if (rsp.data['errNo'] == -2) {
                    $state.go('index.login');
                    $document.scrollTopAnimated(0, 500);
                    Notification.error('账户已在其他设备上登入，请重新登入');
                }

                if (rsp.data["errNo"] != 0 && rsp.data["errNo"] != -2 && config.showErrorMsg)
                    Notification.error(rsp.data['errMsg']);

                deferred.resolve(rsp.data);

            }, function () {

                if (config.showLoading) util.hideSpin();

                if (config.showErrorMsg)
                    Notification.error('出现网络错误');

                deferred.reject();

            });

            return deferred.promise;
        };

        window.api = api;
        return api;
    });
