Router.configure({
    layoutTemplate: 'stack'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        action: function() {
            if (!Meteor.user()) {
                console.log("No user defined!");
                this.render('login');
            } else {
                this.render('home');
            }

        }
    });
});