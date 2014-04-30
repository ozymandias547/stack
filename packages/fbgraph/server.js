Meteor.methods({
    'getFacebookFriends': function(userId) {
        var graph = Npm.require('fbgraph');

        if (Meteor.user().services.facebook.accessToken) {
            graph.setAccessToken(Meteor.user().services.facebook.accessToken);
            var at = Meteor.user().services.facebook.accessToken;
            var future = new Future(),
                onComplete = future.resolver();

            //Async Meteor (help from : https://gist.github.com/possibilities/3443021
            graph.get('/' + Meteor.user().services.facebook.id + '/friends', null, function(err, result) {
                future['return'](result);
            });

            return future.wait();
        }
        return false;
    }
});