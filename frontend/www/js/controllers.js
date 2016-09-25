angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
$scope.loginBtnStatus=true;

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

//switch from login to signup
    $scope.toggleLogin = function(loginStatus) {
        $scope.loginBtnStatus = loginStatus;
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

.controller('SignupCtrl', function($scope) {
  $scope.name = 'Name';
  $scope.phone = 'Phone';
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

.controller('ProfileCtrl', function($scope) {
  //placeholder scopes for app until we create scopes
  $scope.name = 'John Doe';
  $scope.phone = '(111) 111-1111';
  $scope.location = 'San Francisco, CA, US';
  $scope.quote = 'Lorem ipsum dolor sit amet.';
})

.controller('CommentCtrl', function($scope) {
  $scope.subject = 'Test';
  $scope.message = 'Lorem ipsum dolor sit amet.';
})

.controller('SignupCtrl', function($scope) {
  $scope.message = 'Test';
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
