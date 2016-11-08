angular.module('starter.controllers', [])
//Criar um arquivo diferente para cada controller
.controller('DashCtrl', function($scope, $ionicPopup, $cordovaSQLite) {

  $scope.insertSubject = function(name, description, status) {
        var query = "INSERT INTO subject (name, description, status) VALUES (?,?,?)";
        $cordovaSQLite.execute(db, query, [name, description, status]).then(function(res) {
            alert("Registro inserido com sucesso: ID " + res.insertId);
        }, function (err) {
            alert(err);
        });
    }

  $scope.selectAllSubjects = function() {
        $scope.subjects = [];
        var query = "SELECT * FROM subject";
        $cordovaSQLite.execute(db, query).then(function(res) {
          for(let i=0 ; i<res.rows.length ; i++){
            $scope.subjects.push(res.rows.item(i));
          }
        }, function (err) {
          alert(err);
        });
    }

  $scope.onSubjectHold = function(id){
    alert('ID '+ id);
  }

  $scope.addSubject = function() {
    //extrair iss para um arquivo separado e usar templateUrl
    var formTemplate = '<label>Name:</label><input type="text" ng-model="data.name">'+
    '<label>Description:</label><input type="text" ng-model="data.description">'+
    '<label>Status:</label><div class="button-bar" style="margin: 10px 0px 0px 0px;">'+
    '<input type="radio" ng-model="data.status" ng-value="1" />'+
    '<input type="radio" ng-model="data.status" ng-value="2"/>'+
    '<input type="radio" ng-model="data.status" ng-value="3"/>'+
    '</div><div class="button-bar text-center" style="margin: 10px 0px 0px 0px;">'+
    '<label style="width:33.5%;">nice</label>'+
    '<label style="width:33.5%;">not so nice</label>'+
    '<label style="width:33.5%;">:/</label>'+
    '</div>';
    $scope.data = {
      status:1
    };
    var myPopup = $ionicPopup.show({
      template: formTemplate,
      title: 'Enter subject data',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.name) {
              //don't allow the user to close unless he enters subject name
              e.preventDefault();
            } else {
              var sub = {
                name:$scope.data.name,
                description:$scope.data.description?$scope.data.description:'',
                status:$scope.data.status
              }
              $scope.insertSubject(sub.name, sub.description, sub.status);

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
