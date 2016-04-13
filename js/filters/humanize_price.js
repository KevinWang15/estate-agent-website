angular.module('estateAgent.filters').filter("humanize_price", function ($sce) {
    function toHtml(price) {
        return (price.substr(0, price.length - 2) + "<span style='font-size: 0.8em;margin-right: 2px;'>" + price.substr(price.length - 2) + "</span>");
    }

    return function (price) {
        return $sce.trustAsHtml("￥" + (price > 10000 ? toHtml((price / 10000).toFixed(2)) + "万" : toHtml((+price).toFixed(2))));
    }
});