angular.module('monjournal.services', [])

.factory('Notes', function() {
	var notes=[
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
    ];

    return {
    	all: function(){
    		return notes;
    	}
    };
});