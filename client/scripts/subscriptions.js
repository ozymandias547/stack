Deps.autorun(function() {
    Meteor.subscribe("stacks", Meteor.userId());

    Meteor.subscribe("tasks", Meteor.userId());

    Meteor.subscribe("userConnections");

    Meteor.subscribe("userData", null, function() {
        Session.set("userData", Meteor.user());

        // Once user data is retrieved, we can then request
        // the all the facebook friends of that user.
        Meteor.call('getFacebookFriends', {
            userId: Meteor.userId(),
            all: true
        }, function(e, r) {
            r.all.sort(function(a, b) {
                return a.name < b.name ? -1 : 1;
            });

            Session.set('fbFriendsAll', r.all);
            Session.set('fbFriendsByName', r.byName);
            Session.set('fbFriendsById', r.byIds);
        });
    });
});