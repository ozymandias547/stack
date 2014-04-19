Router.configure({
    layoutTemplate: 'stash'
});

Router.map(function() {
    this.route('home', { path: '/' });
    this.route('about'), { path: '/about'}
});
