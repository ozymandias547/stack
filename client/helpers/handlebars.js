
Handlebars.registerHelper('fbFriends',
    function() {
        return Session.get('fbFriendsAll');
    });

Handlebars.registerHelper('$userId',
    function() {
        return Meteor.user() ? Meteor.user()._id : 'N/A';
    });

Handlebars.registerHelper('$userFbId',
    function() {
        return (Meteor.user() && Meteor.user().services) ? Meteor.user().services.facebook.id : '';
    });

Handlebars.registerHelper('$userImage', function() {
    return (Meteor.user() && Meteor.user().services) ? 'http://graph.facebook.com/' + Meteor.user().services.facebook.id + '/picture/?type=normal' : '';
});

Handlebars.registerHelper('$userName', function() {
    return Meteor.user().profile.name;
});

Handlebars.registerHelper('$userNameByUserId',
    function(userId) {
        var user = Meteor.users.find({
            _id: userId
        }).fetch();
        return user.length ? user[0].profile.name : 'N/A';
    });

Handlebars.registerHelper('$fbImageByUserId', function(id) {
    var mark = Session.get('updateCollaboratorsMark');

    if (Meteor.user && id == Meteor.user._id) {
        return 'http: //graph.facebook.com/' + Meteor.user.services.facebook.id + '/picture/?type=small';
    }

    var friend = Meteor.users.find({
        _id: id
    }).fetch()[0];

    return friend && friend.services ? 'http://graph.facebook.com/' + friend.services.facebook.id + '/picture/?type=small' : "http://at-cdn-s01.audiotool.com/2013/01/17/users/rishbh/avatar512x512-28f5d445a89d4473b442435edd4cb183.jpg";
});