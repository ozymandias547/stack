Template.TaskAddTpl.helpers({
    "isEditingAddTask": function(template) {
        return this.isEditing || false;
    }
})

Template.TaskAddTpl.events({

    "click .TaskAddButton": function(event, template) {
        var $addTaskButton = $(template.find(".TaskAddButton"));
        var $TaskAddForm = $(template.find(".TaskAddForm"));

        $addTaskButton.addClass("hidden");
        $TaskAddForm.removeClass("hidden");

        $TaskAddForm.find("input").focus();
    },

    "click .TaskAddSubmit": function(event, template) {

        var $addTaskButton = $(template.find(".TaskAddButton"));
        var $TaskAddForm = $(template.find(".TaskAddForm"));
        var $TaskAddButton = $(template.find(".TaskAddButton"));
        var $TaskInput = $(template.find('input'))

        var newPriority = _.max(Task.find({
            stackId: this._id
        }).fetch().map(function(task) {
            return task.priority
        })) + 1;

        if (newPriority == -Infinity) newPriority = 0;

        // Resubscribe to the tasks document in order to refresh the tasks. (see my note below)
        Meteor.subscribe("tasks");

        // Does this insert NOT invalidate the tasks publication???
        Task.insert({
            userId: Meteor.userId(),
            stackId: this._id,
            name: $TaskInput.val(),
            priority: newPriority
        });

        $(template.find('textarea')).val("");
        $addTaskButton.removeClass("hidden");
        $TaskAddForm.addClass("hidden");

        $TaskAddButton.find('a').focus();
    },

    "click .TaskAddCancel": function(event, template) {
        var $addTaskButton = $(template.find(".TaskAddButton"));
        var $TaskAddForm = $(template.find(".TaskAddForm"));
        var $TaskAddButton = $(template.find(".TaskAddButton"));

        $(template.find('textarea')).val("");
        $addTaskButton.removeClass("hidden");
        $TaskAddForm.addClass("hidden");

        $TaskAddButton.find('a').focus();
    }
});