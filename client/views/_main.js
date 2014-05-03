
Template.main.helpers({
    fbFriends: function() {
        return Session.get('fbFriendsAll');
    },
    user_id: function() {
        var user = Session.get("userData");
        if (user && user.services.facebook) {
            return user.services.facebook.id;
        }
        return "";
    }
});

Template.main.events({
    "click .logout": function(event) {
        Meteor.logout();
    }
});