/* Service interaction */

angular.module('onePass')
    .service('onePass.services', ['$http', function ($http) {
    }]);

//    var API_END_POINT = "https://onepassdataapi.azurewebsites.net/api/";// "@System.Configuration.ConfigurationManager.AppSettings["toDoListAPIURL"]";
    
//    $http.defaults.useXDomain = true;
//    delete $http.defaults.headers.common['X-Requested-With'];

//    return {
//        getAccounts: function () {
//            return $http.get(API_END_POINT + 'Accounts');
//        },
//        getAccount: function (id) {
//            return $http.get(API_END_POINT + 'Accounts/' + id);
//        },
//        //postItem: function (item) {
//        //    return $http.post(API_END_POINT + '/api/TodoList', item);
//        //},
//        //putItem: function (item) {
//        //    return $http.put(API_END_POINT + '/api/TodoList/', item);
//        //},
//        //deleteItem: function (id) {
//        //    return $http({
//        //        method: 'DELETE',
//        //        url: API_END_POINT + '/api/TodoList/' + id
//        //    });
//        //}
//    };
//}]);

//.service('ItemsModel', function ($http, Backand) {
//    var service = this,
//        baseUrl = '/1/objects/',
//        objectName = 'items/';

//    function getUrl() {
//        return Backand.getApiUrl() + baseUrl + objectName;
//    }

//    function getUrlForId(id) {
//        return getUrl() + id;
//    }

//    service.all = function () {
//        return $http.get(getUrl());
//    };

//    service.fetch = function (id) {
//        return $http.get(getUrlForId(id));
//    };

//    service.create = function (object) {
//        return $http.post(getUrl(), object);
//    };

//    service.update = function (id, object) {
//        return $http.put(getUrlForId(id), object);
//    };

//    service.delete = function (id) {
//        return $http.delete(getUrlForId(id));
//    };
//})