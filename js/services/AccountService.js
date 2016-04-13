angular.module('estateAgent.services').service('accountService',
    function ($http, $q, $rootScope, Notification, $state) {

        var self = this;

        this.hasToken = function () {
            return !!window.user && !!window.user.token;
        };

        this.loggedIn = function () {
            return window.user && window.user.token && !window.user.isCached;
        };

        this.triggerWhenLoggedIn = function (callback) {
            if (self.loggedIn()) {
                callback();
            } else {
                $rootScope.$on('accountService.loginSuccessful', function () {
                    callback();
                });
            }
        };


        this.afterLogin = function () {
            var deferred = $q.defer();
            if (self.loggedIn()) {
                deferred.resolve();
            } else {
                $rootScope.$on('accountService.loginSuccessful', function () {
                    deferred.resolve();
                });
            }
            return deferred.promise;
        };

        this.login = function (mobile, password, showLoading) {
            var deferred = $q.defer();
            api('login', {mobile: mobile, password: password}, {
                showLoading: showLoading,
                showErrorMsg: false
            }).then(function (data) {
                if (data.errNo == 0) {
                    localStorage['mobile'] = mobile;
                    localStorage['password'] = password;
                    if (!window.user) window.user = {};
                    window.user.token = data.API_TOKEN;
                    localStorage.setObject('user_cache', window.user);
                    $rootScope.$broadcast('accountService.loginSuccessful');

                    self.getUserInfo().then(function () {
                        window.user.isCached = false;
                    });
                    deferred.resolve();
                } else {
                    Notification.error(data.errMsg);
                }
            }, function (rsp) {
                deferred.reject(rsp);
            });
            return deferred.promise;
        };

        this.ensureLoggedIn = function () {
            if (!self.hasToken()) {
                Notification.error('您需要登入后才能进行本操作。');
                $state.go("index.login");
                return $q.reject();
            } else {
                return $q.resolve();
            }
        };

        this.loadToken = function () {
            var cache = localStorage.getObject('user_cache');
            if (!!cache) {
                window.user = cache;
                window.user.isCached = true;
                self.autoLogin();
            }
        };

        this.autoLogin = function () {
            var mobile = localStorage['mobile'];
            var password = localStorage['password'];

            if (mobile && password) {
                self.login(mobile, password, false);
            }
        };

        this.logout = function () {
            for (var k in user) {
                if (user.hasOwnProperty(k)) {
                    delete user[k];
                }
            }
            $rootScope.$broadcast('accountService.logoutSuccessful');
            delete localStorage['password'];
            delete localStorage['user_cache'];
            Notification.success('登出成功！');
            if (window.middleware.authGuard.indexOf($state.$current.self.name) >= 0) {
                $state.go('index.welcome');
            }
        };

        this.getUserInfo = function () {
            var deferred = $q.defer();
            api('who-am-i', {}, {showLoading: false, auth: true}).then(function (data) {
                if (data.errNo == 0) {
                    angular.extend(window.user, data);
                    localStorage.setObject('user_cache', window.user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        };

        $rootScope.accountService = this;
    });
