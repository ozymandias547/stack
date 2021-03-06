Template.stack.helpers({
    collaboratorsMap: function(stack) {
        var mark = Session.get("updateCollaboratorsMark");
        return stack.collaboratorIds ? stack.collaboratorIds.map(function(id) {
            return {
                stack: stack,
                id: id
            };
        }) : [];
    },
    taskOpenCount: function(stack) {

    },
    taskCompletedCount: function(stack) {

    }
});

Template.stack.rendered = function() {
    $('.stackPopover').popover()
}

Template.stack.events({
    "click .StackRemove": function(event, template) {
        var isSure = confirm("Are you sure you would like to remove this stack?");
        if (isSure)
            Stack.update({
                _id: this._id
            }, {
                $set: {
                    state: 1
                }
            });
    },
    "click .StackShare": function(event, template) {
        var $stackShareButton = $(template.find(".StackShare")),
            $stackShareInputContainer = $(template.find(".StackShareInput")),
            $stackShareInput = $stackShareInputContainer.find("input");

        $stackShareButton.addClass("hidden");
        $stackShareInputContainer.removeClass("hidden");

        Meteor.typeahead($stackShareInput, Session.get('fbFriendsAll').map(function(friend) {
            return friend.name;
        }));

        $stackShareInputContainer.find(".tt-input").focus();
    },

    "keydown .StackShareInput": function(event, template) {
        var $stackShareButton = $(template.find(".StackShare")),
            $stackShareInputContainer = $(template.find(".StackShareInput")),
            $stackShareInput = $stackShareInputContainer.find(".tt-input");

        if (event.keyCode == 13) {
            if ($stackShareInput.val() != '') {

                var friendsByName = Session.get("fbFriendsByName");
                var friend = friendsByName[$stackShareInput.val()];

                if (!this.collaboratorIds || this.collaboratorIds.indexOf(friend.userId) == -1) {
                    Stack.update({
                        _id: this._id,
                    }, {
                        $push: {
                            collaboratorIds: friend.userId
                        }
                    });
                }
            }

            Session.set("updateCollaboratorsMark", true);

            $stackShareInput.val("");
            $stackShareButton.removeClass("hidden");
            $stackShareInputContainer.addClass("hidden");
        }
    }
});