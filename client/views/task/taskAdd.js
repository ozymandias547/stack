Template.TaskAddTpl.events({

    "click .TaskAdd": function(event, template) {
        console.log("add");
        var $addTaskButton = $(template.find(".TaskAddButton"));
        var $addTaskInput = $(template.find(".TaskAddInput"));

        $addTaskButton.addClass("hidden");
        $addTaskInput.removeClass("hidden");

        $addTaskInput.focus();
    },

    "keydown .TaskAddInput": function(event, template) {

        var $addTaskButton = $(template.find(".TaskAddButton"));
        var $addTaskInput = $(template.find(".TaskAddInput"));

        if (event.keyCode == 13) {
            if ($addTaskInput.val() != '') {
                // Find highest priority of tasks where stackId is this._id, and add 1.

                var newPriority = _.max(Task.find({
                    stackId: this._id
                }).fetch().map(function(task) {
                    return task.priority
                })) + 1;

                console.log(newPriority);
                if (newPriority == -Infinity) newPriority = 0;

                Task.insert({
                    userId: Meteor.userId(),
                    stackId: this._id,
                    name: $addTaskInput.val(),
                    priority: newPriority,
                    activeUserIds: []
                });
            }
            $addTaskInput.val("");
            $addTaskButton.removeClass("hidden");
            $addTaskInput.addClass("hidden  ");
        }
    }
});