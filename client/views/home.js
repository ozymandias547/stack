// controller for home.html
document.title = "Stack Home";

Deps.autorun(function() {
    Meteor.subscribe("stacks", Meteor.userId());
    Meteor.subscribe("tasks", Meteor.userId());
    Meteor.subscribe("userData", null, function() {
        Session.set("userData", Meteor.user());
    });
});

var minPriTask, maxPriTask;

Template.home.helpers({
    user_image: function() {
        var user = Session.get("userData");
        if (user && user.services.facebook) {
            return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        }
        return "";
    },
    user_name: function() {
        return Meteor.user().profile.name;
    },
    stacks: function() {
        return Stack.find().fetch();
    },
    tasks: function(stack) {
        return Task.find({
            stackId: stack
        }, {
            sort: {
                priority: -1
            }
        });
    }
});

Template.home.events({
    "click .logout": function(event) {
        Meteor.logout();
    },
    "keydown .stackRowAddInput": function(event) {
        var input = document.getElementById('stackRowAddInput');
        var button = document.getElementById('stackRowAddInputButton');
        if (event.keyCode == 13) {
            if (input.value != '') {
                Stack.insert({
                    userId: Meteor.userId(),
                    name: input.value
                });
            }
            input.value = '';
            input.style.display = 'none';
            button.style.display = 'block';
        }
    },
    "click .stackRowAddInput": function(event) {
        var input = document.getElementById('stackRowAddInput');
        var button = document.getElementById('stackRowAddInputButton');

        input.style.display = 'inline';
        button.style.display = 'none';
        input.focus();
    },
    "click .stackRowRemove": function(event) {
        var stackId = event.target.id;
        console.log(stackId);
        Stack.remove({
            _id: stackId
        });
    },
    "keydown .stackAddTaskInput": function(event) {
        var id = event.target.parentElement.id;
        var input = document.getElementById('stackAddTask_' + id);
        var button = document.getElementById('stackAddTaskButton_' + id);
        if (event.keyCode == 13) {
            if (input.value != '') {
                Task.insert({
                    userId: Meteor.userId(),
                    stackId: id,
                    name: input.value,
                    priority: 0
                });
            }
            input.value = '';
            input.style.display = 'none';
            button.style.display = 'block';
        }
    },
    "click .stackAddTask": function(event) {
        var input = document.getElementById('stackAddTask_' + event.currentTarget.id);
        var button = document.getElementById('stackAddTaskButton_' + event.currentTarget.id);

        input.style.display = 'inline';
        button.style.display = 'none';
        input.focus();
    },
    "click .taskRowRemove": function(event) {
        var taskId = event.currentTarget.id;
        console.log(taskId);
        Task.remove({
            _id: taskId
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