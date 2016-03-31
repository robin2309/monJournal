angular.module('monjournal.services', [])

.factory('Notes', function($cordovaSQLite) {
	/*var notes=[
        {
            id:1, 
            title: 'Test1', 
            content: 'Hola el mundo'
        },
        {
            id:2,
            title: 'Test2',
            content: 'Salut le monde'
        },
    ];*/

    return {
    	all: function(){
            var notes = [];
            var query = "SELECT * FROM notes ORDER BY added DESC";
            return $cordovaSQLite.execute(db, query, []).then(function(res){
                for (var i = 0; i < res.rows.length; i++) {
                    notes.push(res.rows.item(i));
                }
                return notes;
            });
    	},
        getId: function(id){
            return $cordovaSQLite.execute(db, "SELECT * FROM notes WHERE id=?", [id]).then(function(res){
                console.log("1");
                return res.rows.item(0);
            });
        },
        insert: function(postData){
            var query = "INSERT INTO notes (title, content) VALUES (?, ?)";
            return $cordovaSQLite.execute(db, query, [postData.title,postData.content]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                return res.insertId;
            });
        }
    };
});