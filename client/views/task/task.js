Template.task.events({
    "click .TaskEditButton": function(event, template) {
        var $TaskTitle = $(template.find(".TaskTitle"));
        var $TaskButtonDock = $(template.find(".buttonDockRight"));
        var $TaskEditForm = $(template.find(".TaskEditForm"));

        $TaskTitle.addClass("hidden");
        $TaskButtonDock.addClass("hidden");
        $TaskEditForm.removeClass("hidden");

        $TaskEditForm.find("textarea").val($TaskTitle.find(".taskName").text());
        $TaskEditForm.find("textarea").focus();

    },
    "click .TaskEditSubmit": function(event, template) {
        var $TaskTitle = $(template.find(".TaskTitle"));
        var $TaskButtonDock = $(template.find(".buttonDockRight"));
        var $TaskEditForm = $(template.find(".TaskEditForm"));
        var $TaskEditInput = $(template.find('textarea'))

        Task.update({
            _id: this._id
        }, {
            $set: {
                name: $TaskEditInput.val()
            }
        });

        $TaskTitle.removeClass('hidden');
        $TaskButtonDock.removeClass('hidden');
        $TaskEditForm.removeClass('hidden');
        $TaskEditForm.addClass("hidden");
    },

    "click .TaskEditCancel": function(event, template) {
        var $TaskTitle = $(template.find(".TaskTitle"));
        var $TaskButtonDock = $(template.find(".buttonDockRight"));
        var $TaskEditButton = $(template.find(".TaskEditButton"));
        var $TaskEditForm = $(template.find(".TaskEditForm"));

        $(template.find('textarea')).val("");

        $TaskTitle.removeClass("hidden");
        $TaskEditButton.removeClass("hidden");
        $TaskButtonDock.removeClass('hidden');
        $TaskEditForm.addClass('hidden');
    },
    "click .TaskComplete": function(event, template) {
        Task.update({
            _id: this._id
        }, {
            $set: {
                state: 1
            }
        });
    },
    "click .TaskStartStop": function(event, template) {
        var curTask = Task.find({
            _id: this._id
        }).fetch()[0];

        if (curTask.activeUserIds && curTask.activeUserIds.indexOf(Meteor.userId()) != -1)
            return;

        console.log('Starting!');

        curActiveUserIds = curTask.activeUserIds ? curTask.activeUserIds : [];

        Task.update({
            _id: this._id
        }, {
            $set: {
                activeUserIds: curActiveUserIds.concat([Meteor.userId()])
            }
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