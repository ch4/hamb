angular.
module('starter.services', [])
  .factory('UserService', ['$http', function($http) {
  var users = [];
  getAllUsers();
  return {
    getUser: getUser,
    setUser: setUser
  };
  function getAllUsers(){
    return $http.get('http://www.mindengei.com/api/users')
      .then(function (results) {
        users = results.data;
        return;
      }, function (error) {
        return;
      });
  }
  function getUser(userId){
    return users.filter(function(user){return user._id == userId;})[0];
  }
  function setUser(userObj){
    user = userObj;
  }
}])
  .factory('NeedService', ['$http', function($http) {
    return {
      getNeedsByUser: getNeedsByUser,
      postNeeds: postNeeds,
      getAllNeeds: getAllNeeds,
      getNeed: getNeed
    };

    function getNeed(needId){
      return $http.get('http://www.mindengei.com/api/needs/'+needId)
        .then(function (results) {
          return results.data;
        }, function (error) {
          return [];
        });
    }
    function getNeedsByUser(userId){
      // TODO
      return [];
    }
    function getAllNeeds(){
      return $http.get('http://www.mindengei.com/api/needs')
        .then(function (results) {
          return results.data;
        }, function (error) {
          return [];
        });
    }
    function postNeeds(userId, text){
      return $http.post('http://www.mindengei.com/api/users/'+userId+'/needs',{text:text})
        .then(function (results) {
          return results.data;
        }, function (error) {
          return [];
        });
    }
  }])
  .factory('CommentService', ['$http', function($http) {

    return {
      getCommentsByNeed: getCommentsByNeed,
      postComments: postComments,
      getAllComments: getAllComments
    };

    function getCommentsByNeed(needId){
      return $http.get('http://www.mindengei.com/api/needs/'+needId+'/comments')
        .then(function (results) {
          return results.data;
        }, function (error) {
          return [];
        });
    }
    function getAllComments(){
      // TODO
      return [];
    }
    function postComments(user, commentObj){
      // TODO

      return [];
    }
  }]);
