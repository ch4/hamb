angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, UserService) {

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
    UserService.setUser($scope.loginData);

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
.controller('FeedCtrl', function($scope, $stateParams, $state, $ionicModal, $location, UserService, NeedService) {
  $scope.need = {};
  $scope.expandNeedInput = function(){
    $scope.isNeedInputExpanded = true;
  };

  $scope.refresh = function(){
    NeedService.getAllNeeds().then(function(result){
      $scope.allNeeds = result;
    });
  };

  $scope.getUser = function(userId){
    return UserService.getUser(userId);
  };

  $scope.needClickEvent = function(needId){
    // var user = UserService.getUser();
    // if(!user.length){
    //   // Create the login modal that we will use later
    //   $ionicModal.fromTemplateUrl('templates/login.html', {
    //     scope: $scope
    //   }).then(function(modal){
    //     $scope.modal = modal;
    //     $scope.modal.show();
    //   });
    // } else {
    //   $state.go('app.comments', {needId: needId});
    // }
    $location.path('/app/comments/'+needId);
  };

  $scope.submitNeed = function(){
    NeedService.postNeeds('57e7418dc7bf9aac05f4fe82', $scope.need.text).then(function(){
      $scope.refresh();
    });
  };

  $scope.refresh();
})

.controller('ProfileCtrl', function($scope) {
  //placeholder scopes for app until we create scopes
  $scope.name = 'John Doe';
  $scope.location = 'San Francisco, CA, US';
  $scope.date = 'September 23, 2016';
})

.controller('CommentCtrl', function($scope, $ionicModal, $stateParams, NeedService, CommentService, UserService) {
    // $scope.getNeed = function(){
    var needId = $stateParams.needId;
    NeedService.getNeed(needId).then(function(result){
      $scope.need = result;
    });
  // }
  CommentService.getCommentsByNeed(needId).then(function(result){
    console.log(result);
    $scope.comments = result;
  });

  $scope.getUser = function(userId){
    return UserService.getUser(userId);
    };

  // Post comment
  $scope.submitComment = function(){
    console.log('test');
    CommentService.postComments(needId,'57e741a0c7bf9aac05f4fe85',$scope.comment.text).then(function(result){
      console.log(result);
      CommentService.getCommentsByNeed(needId).then(function(result){
        console.log(result);
        $scope.comments = result;
      });
    });
  };


  //Form data for the post model
  $scope.postData = {};
  $scope.postBtnStatus=true;

  // //Creates a comment modal
  // $ionicModal.fromTemplateUrl('templates/newcommentform.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // })

  // Triggered in the post
  $scope.closeComment = function() {
    $scope.modal.hide();
  };

  // Open the comment modal
  $scope.comment = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.addComment = function() {
  //   console.log('adding comment', $scope.addComment);
  //   CommentService.postComments($scope.comment.needId,'57e741a0c7bf9aac05f4fe85', $scope.comment.text);
  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeComment();
  //   }, 1000);
  // };


})

.controller('SignupCtrl', function($scope) {
  $scope.message = 'Test';
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
