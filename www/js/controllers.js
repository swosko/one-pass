angular.module('onePass.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AccountListCtrl', ['$scope', 'onePass.factory.accountSvc',
    
    function ($scope, acctSvc) {

        $scope.accounts;
        
        getAccounts(); // preload them

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

.controller('AccountDetailCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicPopup', 'onePass.factory.accountSvc',
    
    function ($scope, $stateParams, $ionicLoading, $ionicPopup, acctSvc) {

        $scope.acct;

        $scope.$on('$ionicView.enter', function(e) {
            console.log('Fetch details (no cache) for acct id: ' + $stateParams.accountId);

            getAccount($stateParams.accountId);

            $ionicLoading.show({
                template: 'Loading...',
                // duration: 5000
            });
            //.then(function () {
            //    console.log("The loading indicator is now displayed");
            //});

        });

        function getAccount() {

            acctSvc.getAccountById($stateParams.accountId)
                .then(function (response) {
                    $scope.acct = response.data;

                    $ionicLoading.hide();

                }, function (error) {
                    console.error("Error fetching account details for '" + $stateParams.accountId + "': " + error);
                });
        }

        $scope.saveAccount = function () {
            console.log("Add a new account!");
        };

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

]);

