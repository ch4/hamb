angular.
module('starter.services', []).
factory('UserService', [function() {
  var user = {};

  return {
    getUser: getUser
  };

  function getUser(){
    return user;
  }
  function setUser(userObj){
    user = userObj;
  }
}]);
