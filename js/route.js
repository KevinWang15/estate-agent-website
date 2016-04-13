angular.module('estateAgent')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: "",
                abstract: true,
                templateUrl: "templates/pages/index.html"
            })
            .state('index.welcome', {
                url: "/welcome",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "templates/partials/carousel-header.html",
                        controller: 'CarouselHeaderController'
                    },
                    'body': {
                        templateUrl: "templates/pages/index/welcome.html",
                        controller: 'WelcomeController'
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })
            .state('index.signup', {
                url: "/sign-up",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/index/signup.html",
                        controller: "SignupController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })

            .state('index.login', {
                url: "/login",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/index/login.html",
                        controller: "LoginController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })

            .state('index.memberCenter', {
                url: "/member-center?:activePage",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {},
                    'body': {
                        templateUrl: "templates/pages/index/member-center.html",
                        controller: "MemberCenterController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })

            .state('index.estate-detail', {
                url: "/estate-detail?id",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/estate-detail.html",
                        controller: "EstateDetailController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })


            .state('index.seller-detail', {
                url: "/seller-detail?id",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/seller-detail.html",
                        controller: "SellerDetailController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })


            .state('index.agent-detail', {
                url: "/agent-detail?id",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/agent-detail.html",
                        controller: "AgentDetailController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })

            .state('index.test-users', {
                url: "/test-users",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/test-users.html",
                        controller: "TestUsersController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            })

            .state('index.estate-list', {
                url: "/estate-list?id",
                views: {
                    'navbar': {
                        templateUrl: "templates/partials/navbar.html",
                        controller: 'NavbarController'
                    },
                    'header': {
                        templateUrl: "",
                        controller: ''
                    },
                    'body': {
                        templateUrl: "templates/pages/estate-list.html",
                        controller: "EstateListController"
                    },
                    'footer': {
                        templateUrl: "templates/partials/footer.html",
                        controller: 'FooterController'
                    }
                }
            });

        $urlRouterProvider.otherwise('welcome');
        $locationProvider.html5Mode(false);
    });