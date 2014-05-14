Router.map(function() {
    
    this.route('home', {
        path: '/',
        onBeforeAction: function() {
            if ( Meteor.userId() ) Router.go("/user/" + Meteor.userId())
        },
        layoutTemplate: 'templateNoHeader',
        template: 'login'
    });

    this.route('login', {
        path: '/login',
        onBeforeAction: function() {
            if ( Meteor.userId() ) Router.go("/user/" + Meteor.userId())
        },
        action: function() {console.log("login action"); this.render()},
        template: "login",
        layoutTemplate: "templateNoHeader"
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
    });

    this.route('userSingle', {
        path: '/user/:_id',
        layoutTemplate: 'templateHeader',
        onBeforeAction: function() {
            if ( !Meteor.userId() ) Router.go("/login")
        },
        template: 'stacks'
    })
});