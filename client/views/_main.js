
Handlebars.registerHelper('fbFriends',
    function() {
        return Session.get('fbFriendsAll');
    });

Handlebars.registerHelper('$userId',
    function() {
        return Session.get("userData")._id;
    });

Handlebars.registerHelper('$userFbId',
    function() {
        var user = Session.get("userData");
        return (user && user.services.facebook) ? user.services.facebook.id : "";
    });

Handlebars.registerHelper('$userName',
    function() {
        return Session.get("userData").name;
    });

Handlebars.registerHelper('$userNameByUserId',
    function(userId) {
        var user = Meteor.users.find({
            _id: userId
        }).fetch();
        return user[0].profile.name;
    });

Handlebars.registerHelper('$fbImageByUserId', function(id) {
    console.log("Getting facebook photo for: " + id);
    var mark = Session.get("updateCollaboratorsMark");
    var user = Session.get("userData");

    if (user && id == user._id) {
        return 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=small'
    }
    if (Session.get("fbFriendsById")) {
        var friend = Session.get("fbFriendsById")[id];
        return friend ? 'http://graph.facebook.com/' + friend.id + '/picture/?type=small' : "http://at-cdn-s01.audiotool.com/2013/01/17/users/rishbh/avatar512x512-28f5d445a89d4473b442435edd4cb183.jpg";
    }
    return "http://at-cdn-s01.audiotool.com/2013/01/17/users/rishbh/avatar512x512-28f5d445a89d4473b442435edd4cb183.jpg";
});

Template.main.events({
    "click .logout": function(event) {
        Meteor.logout();
    }
});