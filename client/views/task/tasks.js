Template.tasks.helpers({
    tasks: function () {

        // Double check that tasks have been joined to the collection
        if (!this.tasks) {
            return getTasksFor(this._id).all;
        }
        else return this.tasks;
            
    }
});

Template.tasks.rendered = function() {
    $(".sortable").each(function() {
        $(this).sortable({
            placeholder: "ui-state-highlight",
            handle: ".handle",
            axis: "y",
            stop: function(event, ui) {

                var el = ui.item.get(0),
                    before = ui.item.prev().get(0),
                    after = ui.item.next().get(0),
                    newRank;
                
                if (!before) {
                    newRank = SimpleRationalRanks.beforeFirst(UI.getElementData(after).priority);
                } else if (!after) {
                    newRank = SimpleRationalRanks.afterLast(UI.getElementData(before).priority)
                } else {
                    newRank = SimpleRationalRanks.between(
                        UI.getElementData(before).priority,
                        UI.getElementData(after).priority
                    );
                }

                Task.update(UI.getElementData(el)._id, {
                    $set: {
                        priority: newRank
                    }
                })
            }
        });

        $(this).disableSelection();
    });
}