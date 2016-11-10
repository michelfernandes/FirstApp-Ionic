angular.module('starter.controllers', [])
//Criar um arquivo diferente para cada controller
.controller('DashCtrl', function($scope, $ionicPopup, $ionicLoading, dataFactory) {
  var spinnerSettings = {
    template : '<ion-spinner></ion-spinner><p>Loading...</p>',
    noBackdrop : false
  };

  var populateSubjects = function() {
        $scope.subjects = [];
        $ionicLoading.show(spinnerSettings);
        dataFactory.selectAllSubjects().then(function(res) {
          $ionicLoading.hide();
          for(let i=0 ; i<res.rows.length ; i++){
            $scope.subjects.push(res.rows.item(i));
          }
        }, function (err) {
          $ionicLoading.hide();
          alert(err);
        });
    }

  $scope.subjects = [];
  setTimeout(function(){
    populateSubjects();
  },1000)

  $scope.onEditClick = function(subject){

    $scope.data = {
      id:subject.id,
      name:subject.name,
      description:subject.description,
      status:subject.status
    };

    var editPopup = $ionicPopup.show({
      templateUrl: 'templates/subject-show.html',
      title: 'Enter subject data',
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
                id:$scope.data.id,
                name:$scope.data.name,
                description:$scope.data.description?$scope.data.description:'',
                status:$scope.data.status
              }

              $ionicLoading.show(spinnerSettings);
                dataFactory.updateSubject(sub.name, sub.description, sub.status, sub.id).then(function(results) {
                  $ionicLoading.hide();
                  populateSubjects();
                }, function (err) {
                  $ionicLoading.hide();
                  alert(err);
                });

            }
          }
        }
      ]
    });
  }

  $scope.onDeleteClick = function(id){
    var deletePopup = $ionicPopup.confirm({
      title: 'Delete',
      template: 'Are you sure you want to delete this subject?',
      okType: 'button-assertive'
    });

    deletePopup.then(function(res) {
      if(res) {
        $ionicLoading.show(spinnerSettings);
          dataFactory.deleteSubject(id).then(function(){
            $ionicLoading.hide();
            populateSubjects();
          }, function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      }
    });

  }

  $scope.addSubject = function() {

    $scope.data = {
      status:1
    };

    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/subject-show.html',
      title: 'Enter subject data',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Create</b>',
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

              $ionicLoading.show(spinnerSettings);
              dataFactory.insertSubject(sub.name, sub.description, sub.status).then(function(res) {
                $ionicLoading.hide();
                  populateSubjects();
              }, function (err) {
                $ionicLoading.hide();
                  alert(err);
              });

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
