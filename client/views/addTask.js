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

                Task.insert({
                    userId: Meteor.userId(),
                    stackId: this._id,
                    name: $addTaskInput.val(),
                    priority: 0
                });
            }
            $addTaskInput.val("");
            $addTaskButton.removeClass("hidden");
            $addTaskInput.addClass("hidden  ");
        }
    }
});