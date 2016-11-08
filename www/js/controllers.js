angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup) {

  $scope.addSubject = function() {
    var formTemplate = '<label>name:</label><input type="text" ng-model="data.name">'+
    '<label>description:</label><input type="text" ng-model="data.description">'+
    '<div class="button-bar">'+
    '<ion-radio style="width:33.5%" ng-model="choice" ng-value="1"></ion-radio>'+
    '<ion-radio style="width:33.5%" ng-model="choice" ng-value="2"></ion-radio>'+
    '<ion-radio style="width:33.5%" ng-model="choice" ng-value="3"></ion-radio>'+
    '</div>';
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: formTemplate,
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });
  };

  $scope.showInformation = function(name, description) {

     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'Name: '+name +'<br/>'+ 'Description: '+description
     });

     /*alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });*/

  };


})

.controller('QuotesCtrl', function($scope, $http) {

  $scope.quote = {};

  $http.get('http://quotes.rest/qod.json')
    .then(
      function(response){
        console.log(response);
        $scope.quote.body = response.data.contents.quotes[0].quote;
        $scope.quote.author = response.data.contents.quotes[0].author;
        $scope.quote.date = response.data.contents.quotes[0].date;
      },
      function(error){
        alert('Error: ' + error);
      }
    );

})

.controller('DatabaseCtrl', function($scope, $cordovaSQLite){

  $scope.msg = 'controller';

  $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            alert(err);
        });
    }

  $scope.select = function(lastname) {
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert(err);
        });
    }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
