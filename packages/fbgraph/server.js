Meteor.methods({
    'getFacebookFriends': function(request) {
        var graph = Npm.require('fbgraph');
        var user = Meteor.users.find({
            _id: request.userId
        }).fetch()[0];
        var users = Meteor.users.find().fetch();
        var usersByName = {};
        for (var i = 0; i < users.length; i++) {
            usersByName[users[i].profile.name] = users[i];
        }

        console.log(usersByName);
        if (user.services.facebook.accessToken) {
            graph.setAccessToken(user.services.facebook.accessToken);

            var at = user.services.facebook.accessToken;
            var future = new Future(),
                onComplete = future.resolver();

            //Async Meteor (help from : https://gist.github.com/possibilities/3443021
            graph.get('/' + user.services.facebook.id + '/friends', null, function(err, result) {
                var res = {
                    all: [],
                    byName: {},
                    byIds: {}
                };
                for (var i = 0; i < result.data.length; i++) {
                    var friend = result.data[i];
                    if (usersByName[friend.name]) {

                        friend.userId = usersByName[friend.name]._id;

                        console.log("FOUND", friend);

                        res.all.push(friend);
                        res.byName[friend.name] = friend;
                        res.byIds[friend.userId] = friend;
                    }
                }
                future['return'](res);
            });

            return future.wait();
        }
        return false;
    }
});