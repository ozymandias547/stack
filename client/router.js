Router.configure({
    layoutTemplate: 'onmystack'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        action: function() {
            this.render(!Meteor.user() ? 'login' : 'main');
        }
    });
});