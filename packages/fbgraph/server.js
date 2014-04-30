Meteor.methods({
    'getFacebookFriends': function(request) {
        var graph = Npm.require('fbgraph');
        var user = Meteor.users.find({
            _id: request.userId
        }).fetch()[0];

        if (user.services.facebook.accessToken) {
            graph.setAccessToken(user.services.facebook.accessToken);

            var at = user.services.facebook.accessToken;
            var future = new Future(),
                onComplete = future.resolver();

            //Async Meteor (help from : https://gist.github.com/possibilities/3443021
            graph.get('/' + user.services.facebook.id + '/friends', null, function(err, result) {
                future['return'](result);
            });

            return future.wait();
        }
        return false;
    }
});