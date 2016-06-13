/* Service interaction */

angular.module('onePass')
.factory('onePass.factory.accountSvc', ['$http', function ($http) {

    var API_END_POINT = "https://onepassdataapi.azurewebsites.net/api/";// "@System.Configuration.ConfigurationManager.AppSettings["toDoListAPIURL"]";
    
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    return {
        getAccounts: function () {
            return $http.get(API_END_POINT + 'Accounts');
        },
        getAccountById: function (id) {
            return $http.get(API_END_POINT + 'Accounts/' + id);
        },
        //postItem: function (item) {
        //    return $http.post(API_END_POINT + '/api/TodoList', item);
        //},
        //putItem: function (item) {
        //    return $http.put(API_END_POINT + '/api/TodoList/', item);
        //},
        //deleteItem: function (id) {
        //    return $http({
        //        method: 'DELETE',
        //        url: API_END_POINT + '/api/TodoList/' + id
        //    });
        //}
    };
}]);