Router.map(function() {
    
    this.route('home', {
        path: '/',
        action: function() {
            
            this.render(!Meteor.user() ? 'login' : 'stacks');
        },
        layoutTemplate: 'templateHeader',
        template: 'stacks'
    });

    this.route('stackSingle', {
    	path: '/stack/:_id',
    	waitOn: function() {
    		return Meteor.subscribe("stacks");
    	},
    	data: function() {
    		return Stack.findOne(this.params._id)
    	},
        action: function() {
            this.render(!Meteor.user() ? 'login' : 'stackSingle')
        },
        layoutTemplate: 'templateNoHeader',
    	template: 'stackSingle'
    })
});