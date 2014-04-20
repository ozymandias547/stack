
Router.configure({
    layoutTemplate: 'stack'
});

Router.map(function() {
    this.route('home', { path: '/' });
    this.route('about'), { path: '/about'}
});
