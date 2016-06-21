/* Service interaction */

angular.module('onePass')
.factory('onePass.factory.accountSvc', ['$http', '__env', function ($http, __env) {

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    return {
        getAccounts: function () {
            return $http.get(__env.apiUrl + 'Accounts');
        },
        getAccountById: function (id) {
            return $http.get(__env.apiUrl + 'Accounts/' + id);
        },
        postItem: function (item) {
            return $http.post(__env.apiUrl + 'Accounts', item);
        },
        putItem: function (item) {
            return $http.put(__env.apiUrl + 'Accounts/' + item.Id, item);
        },
        //deleteItem: function (id) {
        //    return $http({
        //        method: 'DELETE',
        //        url: API_END_POINT + '/api/TodoList/' + id
        //    });
        //}
    };
}]);