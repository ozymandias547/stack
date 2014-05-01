// controller for home.html
document.title = "Stack Home";

Deps.autorun(function() {
    Meteor.subscribe("stacks", Meteor.userId());

    Meteor.subscribe("tasks", Meteor.userId());

    Meteor.subscribe("userData", null, function() {
        Session.set("userData", Meteor.user());

        Meteor.call('getFacebookFriends', {
            userId: Meteor.userId(),
            all: true
        }, function(e, r) {
            r.all.sort(function(a, b) {
                return a.name < b.name ? -1 : 1;
            });

            Session.set('fbFriendsAll', r.all);
            Session.set('fbFriendsByName', r.byName);
            Session.set('fbFriendsById', r.byIds);
        });
    });
});

var minPriTask, maxPriTask;

Template.home.helpers({
    collaboratorsMap: function(stack) {
        var mark = Session.get("updateCollaboratorsMark");
        return stack.collaboratorIds ? stack.collaboratorIds.map(function(id) {
            return {
                stack: stack,
                id: id
            };
        }) : [];
    },
    fbFriends: function() {
        return Session.get('fbFriendsAll');
    },
    user_image: function() {
        var user = Session.get("userData");
        if (user && user.services.facebook) {
            return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        }
        return "";
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
    },
    stacks: function() {
        return Stack.find().fetch();
    },
    tasks: function() {
        return Task.find({
            stackId: this._id
        }, {
            sort: {
                priority: -1
            }
        });
    },
    randomId: function() {
        return Random.id();
    },
    fbImageByUserId: function(id) {
        var mark = Session.get("updateCollaboratorsMark");
        if (Session.get("fbFriendsById")) {
            var friend = Session.get("fbFriendsById")[id];
            if (friend)
                return 'http://graph.facebook.com/' + friend.id + '/picture/?type=small';
        }
        return "";
    }
});

Template.home.events({
    "click #btnGetFriendlists": function(event) {
        Meteor.call('getFriendLists', null, function(e, r) {
            console.log('e', e);
            console.log('r', r);
        });
    },
    "click .logout": function(event) {
        Meteor.logout();
    },
    "click .TaskRemove": function(event, template) {
        Task.remove({
            _id: this._id
        });
    },
    "click .StackRemove": function(event, template) {
        Stack.remove({
            _id: this._id
        });
    },

    "click .taskBump": function(event) {
        var taskId = event.currentTarget.id;
        var stackId = event.currentTarget.parentElement.id;

        task = _.max(Task.find({
            stackId: stackId
        }).fetch(), function(task) {
            return task.priority;
        });

        Task.update(taskId, {
            $set: {
                priority: task.priority + 1
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
    },
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