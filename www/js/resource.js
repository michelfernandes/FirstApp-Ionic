angular.module('starter.controllers')
  .factory('dataFactory', ['$http', '$cordovaSQLite', function ($http, $cordovaSQLite) {

          var dataFactory = {};

          dataFactory.insertSubject = function (name, description, status) {
            var query = "INSERT INTO subject (name, description, status) VALUES (?,?,?)";
            return $cordovaSQLite.execute(db, query, [name, description, status]);
          };

          dataFactory.updateSubject = function (name, description, status, id) {
            var query = "UPDATE subject SET name = ?, description = ?, status = ? WHERE id = ?";
            return $cordovaSQLite.execute(db, query, [name, description, status, id]);
          };

          dataFactory.deleteSubject = function (id) {
            var query = "DELETE FROM subject WHERE id = ?";
            return $cordovaSQLite.execute(db, query, [id]);
          };

          dataFactory.selectAllSubjects = function () {
            var query = "SELECT * FROM subject";
            return $cordovaSQLite.execute(db, query);
          };

          return dataFactory;
      }]);
