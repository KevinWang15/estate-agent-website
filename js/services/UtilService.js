angular.module('estateAgent.services').service('UtilService',
    function ($http, $q, $rootScope, $timeout) {
        var spinner = null;

        window.util = this;

        this.err = function (title, message) {
            if (typeof title !== 'string')
                if (typeof title.message === 'string') title = title.message;
            if (!message) message = "";
            console.log('err:' + title + "\n" + message);
        };

        this.randomId = function () {
            return (Math.random() * 1e32).toString(36);
        };

        this.isNumeric = function (input) {
            return (input - 0) == input && ('' + input).trim().length > 0;
        };

        this.getDateString = function (d) {
            var month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        };

        this.hideSpin = function () {
            if (!!spinner) spinner.stop();
            $rootScope.$broadcast("spin-hidden");
        };


        this.isMobile = function (s) {
            var pattern = /^[0-9]{11}$/;
            return pattern.exec(s) !== null;
        };

        this.isEmail = function (str) {
            if (!str) return false;
            str = str.replace('＠', '@').trim();
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(str);
        };

        this.shuffle = function (a) {
            var j, x, i;
            for (i = a.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        };

        this.showSpin = function () {
            var opts = {
                lines: 13 // The number of lines to draw
                , length: 28 // The length of each line
                , width: 14 // The line thickness
                , radius: 42 // The radius of the inner circle
                , scale: 1 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.25 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 60 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            };
            $rootScope.$broadcast("spin-shown");
            var target = document.getElementById('spinHolder');
            spinner = new Spinner(opts).spin(target);
        };
    });