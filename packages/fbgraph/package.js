Package.describe({
    summary: "Facebook fbgraph npm module",
});

Package.on_use(function(api) {
    api.add_files('server.js', 'server');
});

Npm.depends({
    fbgraph: "0.2.10"
});