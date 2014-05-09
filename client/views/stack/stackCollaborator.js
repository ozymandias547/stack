Template.stackCollaborator.events({
    "click .removeCollaborator": function(event, template) {
        this.stack.collaboratorIds.splice(this.stack.collaboratorIds.indexOf(this.id), 1);
        Stack.update({
            _id: this.stack._id,
        }, {
            $set: {
                collaboratorIds: this.stack.collaboratorIds
            }
        });
    },
    "click .viewStacks": function(event, template) {
        // TODO: Change route to user stack page
    },
    "click .viewFacebook": function(event, template) {
        // TODO: Change route to user facebook
    }

});

Template.stackCollaborator.rendered = function() {
    $('.myDropdown').dropdown();
}