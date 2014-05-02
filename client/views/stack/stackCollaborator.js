Template.stackCollaborator.helpers({
    fbImageByUserId: function(id) {
        var mark = Session.get("updateCollaboratorsMark");
        if (Session.get("fbFriendsById")) {
            var friend = Session.get("fbFriendsById")[id];
            return friend ? 'http://graph.facebook.com/' + friend.id + '/picture/?type=small' : "";
        }
        return "";
    }
});

Template.stackCollaborator.events({
    "click .fbCollaboratorImg": function(event, template) {
        console.log(this);
        this.stack.collaboratorIds.splice(this.stack.collaboratorIds.indexOf(this.id), 1);
        Stack.update({
            _id: this.stack._id,
        }, {
            $set: {
                collaboratorIds: this.stack.collaboratorIds
            }
        });
    }
});