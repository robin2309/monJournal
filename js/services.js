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
            var query = "SELECT * FROM notes ORDER BY added";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                for (var i = 0; i < res.rows.length; i++) {
                    notes.push(res.rows.item(i));
                }
            });
    		return notes;
    	}
    };
});