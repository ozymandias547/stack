Template.tasks.helpers({
    tasks: function() {
        return Task.find({
            stackId: this._id
        }, {
            sort: {
                priority: 1
            }
        });
    }
});

SimpleRationalRanks = {
  beforeFirst: function (firstRank) { return firstRank - 1; },
  between: function (beforeRank, afterRank) { return (beforeRank + afterRank) / 2; },
  afterLast: function (lastRank) { return lastRank + 1; }
};

Template.tasks.rendered = function() {
    $( ".sortable" ).each(function() {
        $(this).sortable({
            placeholder: "ui-state-highlight",
            // connectWith: ".taskSortableShare",  
            handle: ".handle",
            axis: "y",
            stop: function(event, ui) {
                
                var el = ui.item.get(0),
                    before = ui.item.prev().get(0),
                    after = ui.item.next().get(0);

                var newRank;

                // Moving to the top of the list
                if(!before) {
                    console.log("first in rank");
                    newRank = SimpleRationalRanks.beforeFirst( UI.getElementData(after).priority );
                } else if(!after) {
                    newRank = SimpleRationalRanks.afterLast( UI.getElementData(before).priority )
                } else {
                    newRank = SimpleRationalRanks.between(
                        UI.getElementData(before).priority,
                        UI.getElementData(after).priority
                    );
                }

                Task.update(UI.getElementData(el)._id, { $set: { priority: newRank }})

            }

        });

        $(this).disableSelection();
    });
}

Template.tasks.events({
    "click .TaskComplete": function(event, template) {
        Task.remove({
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