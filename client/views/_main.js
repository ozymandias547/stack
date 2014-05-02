// controller for home.html
document.title = "Stack Home";

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
    },
    user_name: function() {
        return Meteor.user().profile.name;
    }
});

Template.main.events({
    "click .logout": function(event) {
        Meteor.logout();
    }
});