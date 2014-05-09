Template.header.helpers({
    user_image: function() {
        var user = Session.get("userData");
        if (user && user.services.facebook) {
            return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        }
        return "";
    },
    user_name: function() {
        return Meteor.user().profile.name;
    }
});

Template.header.events({
    "click .edit": function() {

        if (Session.get("isEditing"))  Session.set("isEditing", false)
        else Session.set("isEditing", true);
        
    },
    "click img" : function() {
        Meteor.logout();
    }
})