Template.stack.helpers({
    collaboratorsMap: function(stack) {
        var mark = Session.get("updateCollaboratorsMark");
        return stack.collaboratorIds ? stack.collaboratorIds.map(function(id) {
            return {
                stack: stack,
                id: id
            };
        }) : [];
    }
});

Template.stack.events({
    "click .StackEditTitleButton": function(event, template) {
        var $StackTitle = $(template.find('.StackTitle'));
        var $StackEditTitleForm = $(template.find('.StackEditTitleForm'));

        $StackTitle.addClass('hidden');
        $StackEditTitleForm.removeClass('hidden');

        $StackEditTitleForm.find('input').focus();
    },
    "click .StackEditTitleSubmit": function(event, template) {
        var $StackTitle = $(template.find('.StackTitle'));
        var $StackEditTitleForm = $(template.find('.StackEditTitleForm'));
        var $StackEditTitleInput = $(template.find('input'))

        Stack.update({
            _id: this._id
        }, {
            $set: {
                name: $StackEditTitleInput.val()
            }
        });

        $StackTitle.removeClass('hidden');
        $StackEditTitleForm.addClass("hidden");
    },

    "click .StackEditTitleCancel": function(event, template) {
        var $StackTitle = $(template.find(".StackTitle"));
        var $StackEditTitleForm = $(template.find(".StackEditTitleForm"));

        $(template.find('input')).val(this.name);
        $StackTitle.removeClass("hidden");
        $StackEditTitleForm.addClass("hidden");
    },
    "click .StackRemove": function(event, template) {
        var isSure = confirm("Are you sure you would like to remove this stack?");
        if (isSure)
            Stack.remove({
                _id: this._id
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