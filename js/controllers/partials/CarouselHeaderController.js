angular.module('estateAgent.controllers')
    .controller('CarouselHeaderController', function ($scope) {
        var slides = $scope.slides = [
            {
                image: 'img/slides/1.png'
            },
            {
                image: 'img/slides/2.png'
            },
            {
                image: 'img/slides/3.png'
            },
            {
                image: 'img/slides/4.png'
            }
        ];
    });