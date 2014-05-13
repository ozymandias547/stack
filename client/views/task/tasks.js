SimpleRationalRanks = {
    beforeFirst: function(firstRank) {
        return firstRank - 1;
    },
    between: function(beforeRank, afterRank) {
        return (beforeRank + afterRank) / 2;
    },
    afterLast: function(lastRank) {
        return lastRank + 1;
    }
};

Template.tasks.rendered = function() {
    $(".sortable").each(function() {
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
                if (!before) {
                    console.log("first in rank");
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