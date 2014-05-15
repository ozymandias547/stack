Template.stackCollaborator.events({
    "mousedown .removeCollaborator": function(event, template) {
        this.stack.collaboratorIds.splice(this.stack.collaboratorIds.indexOf(this.id), 1);
        Stack.update({
            _id: this.stack._id,
        }, {
            $set: {
                collaboratorIds: this.stack.collaboratorIds
            }
        });
    },
    "mousedown .viewStacks": function(event, template) {
        // TODO: Change route to user stack page
    },
    "mousedown .viewFacebook": function(event, template) {
        // TODO: Change route to user facebook
    }

});

Template.stackCollaborator.rendered = function() {
    $('.myDropdown').dropdown();
}