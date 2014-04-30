Template.addTask.events({

    "click .AddTask": function(event, template) {

        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));

        $addTaskButton.addClass("hidden");
        $addTaskInput.removeClass("hidden");

        $addTaskInput.focus();
    },

    "keydown .AddTaskInput": function(event, template) {

        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));

        if (event.keyCode == 13) {
            if ($addTaskInput.val() != '') {

                Task.insert({
                    userId: Meteor.userId(),
                    stackId: this._id,
                    name: $addTaskInput.val(),
                    priority: 0
                });
            }
            $addTaskInput.val("");
            $addTaskButton.removeClass("hidden");
            $addTaskInput.addClass("hidden");
        }

    }

})