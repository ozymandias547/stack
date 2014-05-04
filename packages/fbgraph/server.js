Meteor.methods({
    'getFacebookFriends': function(request) {
        var graph = Npm.require('fbgraph');

        var user = Meteor.users.find({
            _id: request.userId
        }).fetch()[0];

        if (!user) return false;

        var users = Meteor.users.find().fetch();
        var usersByFbId = {};

        for (var i = 0; i < users.length; i++) {
            if (!users[i].services.facebook) {
                //need to delete the user?
            } else {
                usersByFbId[users[i].services.facebook.id.toString()] = users[i];
            }
        }

        if (user.services.facebook.accessToken) {
            graph.setAccessToken(user.services.facebook.accessToken);

            var future = new Future(),
                onComplete = future.resolver();

            graph.get('/' + user.services.facebook.id + '/friends', null, function(err, result) {
                var res = {
                    all: [],
                    byName: {},
                    byIds: {}
                };

                for (var i = 0; i < result.data.length; i++) {
                    var friend = result.data[i];
                    var curUser = usersByFbId[friend.id];

                    if (curUser || request.all) {

                        friend.userId = curUser ? curUser._id : 'UNKNOWN_USER_ID_' + Math.random();

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