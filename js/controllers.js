angular.module('monjournal.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    var CREATE_NEW_STATE = "app.new";
    $scope.$on('$ionicView.beforeEnter', function(e){
        if($state.current.name === CREATE_NEW_STATE){
            $scope.$root.showAddButton = true;
        } else {
            $scope.$root.showAddButton = false;
        }
    });
})

.controller('HomepageCtrl', function($scope, Notes) {
    Notes.all().then(function(notes){
        $scope.notes = notes;
    });
    //$scope.notes = Notes.all();
})

.controller('CategoriesCtrl', function($scope){
    $scope.test = "Hello from categories";
})

.controller('NoteCtrl', function($scope, $stateParams, Notes){
    Notes.getId($stateParams.noteId).then(function(note){
        $scope.note = note;
    });
})

.controller('NewNoteCtrl', function($scope, $stateParams, Notes){
    $scope.postData = {};
    $scope.newNote = function() {
        console.log($scope.postData);
        Notes.insert($scope.postData).then(function(insertedId){
            $scope.insertId = insertedId;
        });
    }
});
