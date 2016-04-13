angular.module("estateAgent.controllers")
    .controller('SignupController', function ($scope, $interval, Notification, accountService, $state) {
        $scope.formData = {
            mobile: "",
            password: "",
            passwordRepeat: "",
            name: "",
            email: "",
            user_type: 0,
            termsAccepted: 0
        };

        $scope.submit = function () {
            if (!$scope.formData.termsAccepted) {
                Notification.error('请先阅读并同意服务条款！');
                return;
            }

            var validates = {
                mobile: "手机",
                password: "密码",
                passwordRepeat: "确认密码",
                name: "姓名",
                email: "Email地址"
            };

            for (var key in validates) {
                if (validates.hasOwnProperty(key)) {
                    if (!$scope.formData[key]) {
                        Notification.error(validates[key] + "不能为空！");
                        return;
                    }
                }
            }

            if (!util.isEmail($scope.formData['email'])) {
                Notification.error("邮箱无效！");
                return;
            }

            if ($scope.formData.password.length < 8) {
                Notification.error("密码不能小于8位！");
                return;
            }

            if ($scope.formData.password != $scope.formData.passwordRepeat) {
                Notification.error("两次输入的密码不一致！");
                return;
            }

            api('register-submit', $scope.formData, {auth: false}).then(function (data) {
                if (data.errNo == 0) {
                    Notification.success('恭喜，注册成功！');
                    accountService.login($scope.formData.mobile, $scope.formData.password, true)
                        .then(function () {
                            $state.go("index.memberCenter");
                        });
                }
            });
        };
    });