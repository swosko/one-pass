angular.module('onePass')
.filter('mask', function () {
    return function (input) {

        var masked = '';

        if (input) {
            for (var i = 0; i < input.length; i++) {
                if (i > 2) {
                    masked += "*";
                }
                else {
                    masked += input.substring(i, 1);
                }
            }
        }

        return masked;
    };
});