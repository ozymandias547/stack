// controller for home.html
document.title = "Stack Home";

Deps.autorun(function() {
    Meteor.subscribe("stacks", Meteor.userId());
    Meteor.subscribe("tasks", Meteor.userId());
    Meteor.subscribe("fbFriends", Meteor.userId(), function(r) {
        console.log('------FB Friends------', r);
        Session.set("fbFriends", r);
    });
    Meteor.subscribe("userData", null, function() {
        Session.set("userData", Meteor.user());

        Meteor.call('getFacebookFriends', {
            userId: Meteor.userId(),
            onmystackUser: true
        }, function(e, r) {
            console.log(r);

            r.all.sort(function(a, b) {
                return a.name < b.name ? -1 : 1;
            });

            Session.set('fbFriendsAll', r.all);
            Session.set('fbFriendsByName', r.byName);
        });
    });
});

var minPriTask, maxPriTask;

Template.home.helpers({
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

    "click .taskRowRemove": function() {
        Task.remove({
            _id: this._id
        });
    },

    "click .stackRowRemove": function(event) {
        var stackId = event.target.id;
        console.log(stackId);
        Stack.remove({
            _id: stackId
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
    }
});