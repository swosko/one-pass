angular.module('onePass.controllers', [])

.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Login Modal  ----------------------------------------------------------------------
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // CRUD Modal ----------------------------------------------------------------------
    $rootScope.acctData = {};

    $ionicModal.fromTemplateUrl('templates/accounts.crud.html', {
        scope: $scope
    }).then(function (modal) {
        $rootScope.crudModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCrudModal = function () {
        $rootScope.crudModal.hide();
    };

    $scope.addAccount = function () {
        console.log("Add a new account");

        $scope.acctData = {}; // in case it's cached
        $rootScope.crudModal.show();
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('AccountListCtrl', ['$scope', 'onePass.factory.accountSvc',

    function ($scope, acctSvc) {

        $scope.accounts;
        $scope.query;

        $scope.$on('$ionicView.enter', function (e) {
            getAccounts(); // preload them
        });

        function getAccounts() {

            acctSvc.getAccounts()
                .then(function (response) {
                    $scope.accounts = response.data;
                }, function (error) {
                    console.error("Error fetching accounts: " + error);
                    // User status or alert or something to show error popup
                    // $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

        $scope.addAccount = function () {
            console.log("Add a new account!");
        };
    }

])

.controller('AccountDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicModal', '$ionicLoading', '$ionicPopup', 'onePass.factory.accountSvc',

    function ($scope, $rootScope, $stateParams, $ionicModal, $ionicLoading, $ionicPopup, acctSvc) {

        $scope.acct;

        $scope.$on('$ionicView.enter', function (e) {
            console.log('Fetch details (no cache) for acct id: ' + $stateParams.accountId);

            getAccount($stateParams.accountId);

            $ionicLoading.show({
                template: 'Loading...',
                // duration: 5000
            });
        });

        // Not the best - but reset the CRUD modal when we leave
        $scope.$on('$ionicView.leave', function (e) {
            $rootScope.acctData = {};
            $rootScope.modalTitle = null;
            $rootScope.saveTitle = null;
        });

        function getAccount() {

            acctSvc.getAccountById($stateParams.accountId)
                .then(
                    function (response) {
                        $scope.acct = response.data;
                    },
                    function (error) {
                        // console.error("Error fetching account details for '" + $stateParams.accountId + "': " + error);

                        $ionicPopup.alert({
                            title: 'Uh-oh',
                            template: error.status + ': ' + error.statusText
                        });
                    }
                )
                .finally(function () {
                    $ionicLoading.hide();
                });
        }

        // CRUD modal - set the current account and show it - easy peasey
        $scope.showCrudForm = function () {
            console.log("Show the crud form");

            $rootScope.acctData = $scope.acct;

            $rootScope.modalTitle = "Edit";
            $rootScope.saveTitle = "Update";

            $rootScope.crudModal.show();
        };

        //$scope.saveAccount = function () {
        //    console.log("Add a new account!");

        //    $rootScope.crudModal.hide();
        //};

        $scope.deleteAccount = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Account',
                template: 'Are you sure you want to delete this account? Operation cannot be undone.'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };
    }

])
.controller('AccountCrudCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicModal', '$ionicLoading', '$ionicPopup', '$location', 'onePass.factory.accountSvc',

    function ($scope, $rootScope, $stateParams, $ionicModal, $ionicLoading, $ionicPopup, $location, acctSvc) {

        $scope.$on('modal.shown', function (e) {
            $scope.data = $rootScope.acctData;
        });

        $scope.$on('modal.hidden', function (e) {
            $scope.data = {};
        });

        $scope.upsert = function () {

            // Check if it's new OR an update
            console.log("Submit the crud form: " + JSON.stringify($scope.data));
            if (!!$scope.data.Id) {
                acctSvc.putItem($scope.data)
                .then(
                    function (response) {
                        console.log("Awesome - update account success : " + JSON.stringify(response));

                        // Need to redirect to the detail page.

                        // List page is caching
                        //$location.path("app.accountDetail", { accountId : response.data.Id});

                        // On success save - 
                        $rootScope.crudModal.hide();
                    },
                    function (error) {

                        $ionicPopup.alert({
                            title: 'Uh-oh',
                            template: error.status + ': ' + error.statusText
                        });
                    }
                )
                .finally(function () {

                });
            }
            else {
                acctSvc.postItem($scope.data)
                .then(
                    function (response) {
                        console.log("Awesome - created account success : " + JSON.stringify(response.data));

                        $location.path('app.accountDetail').search({ accountId: response.data.Id });

                        // On success save - 
                        $rootScope.crudModal.hide();
                    },
                    function (error) {
                        // console.error("Error fetching account details for '" + $stateParams.accountId + "': " + error);

                        $ionicPopup.alert({
                            title: 'Uh-oh',
                            template: error.status + ': ' + error.statusText
                        });
                    }
                )
                .finally(function () {

                });
            }
        }

    }
]);