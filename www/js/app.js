// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js    // , 'onePass.services'
angular.module('onePass', ['ionic', 'onePass.controllers']) 

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.accounts', {
        url: '/accounts',
        views: {
            'menuContent': {
                templateUrl: 'templates/accounts.html',
                controller: 'AccountListCtrl'
            }
        }
    })
    .state('app.accountDetail', {
        cache: false,
        url: '/accounts/:accountId',
        views: {
            'menuContent': {
                templateUrl: 'templates/accounts.detail.html',
                controller: 'AccountDetailCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});


/*
ONE WAY TO HANDL EUNAUTH AND VERIFY
.run(function($rootScope, $state, LoginService, Backand) {

  function unauthorized() {
    console.log("user is unauthorized, sending to login");
    $state.go('tab.login');
  }
  function signout() {
    LoginService.signout();
  }

  $rootScope.$on('unauthorized', function() {
    unauthorized();
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name == 'tab.login') {
      signout();
    }
    else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
      unauthorized();
    }
  });

*/