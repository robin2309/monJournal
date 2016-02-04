// database connection
var db=null;
angular.module('monjournal', ['ionic', 'ngCordova', 'monjournal.controllers', 'monjournal.services'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB({ name: "monjournal"});
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS notes(\
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        title TEXT NOT NULL,\
        added TIMESTAMP NOT NULL,\
        content TEXT\
    );");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories(\
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        name TEXT\
    );");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS notesCategories(\
        idNote INTEGER NOT NULL,\
        idCategory INTEGER NOT NULL,\
        PRIMARY KEY (idNote, idCategory),\
        FOREIGN KEY(idNote) REFERENCES notes(id),\
        FOREIGN KEY(idCategory) REFERENCES categories(id)\
    );");
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

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/homepage.html',
                controller: 'HomepageCtrl'
            }
        }
    })

    .state('app.categories', {
        url: '/categories',
        views: {
            'menuContent': {
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesCtrl'
            }
        }
    })

    .state('app.new', {
        url: '/new',
        views: {
            'menuContent': {
                templateUrl: 'templates/new.html',
                controller: 'NewNoteCtrl'
            }
        }
    });

    /*;*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
