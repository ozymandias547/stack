function getTasksFor(stackId) {
    var tasks = Task.find({
        stackId: stackId,
        state: {
            $ne: 1
        }
    }, {
        sort: {
            priority: 1
        }
    }).fetch();

    var regExpFilter = Session.get('regExpFilter') ? new RegExp(Session.get('regExpFilter')) : undefined;
    var result = [];

    // Linkify and filter by regexp
    for (var i = 0; i < tasks.length; i++) {
        if (regExpFilter !== undefined && !regExpFilter.test(JSON.stringify(tasks[i])))
            continue;

        result.push(tasks[i]);

        tasks[i].name = linkify(tasks[i].name, {
            callback: function(name, href) {
                return href ? ('<a href=\'' + href + '\' target=\'_blank\'>' + name + '</a>') : name;
            }
        });
    }

    return result;
};

Template.stacks.helpers({
    stacks: function() {
        var regExpFilter = Session.get('regExpFilter') ? new RegExp(Session.get('regExpFilter')) : undefined;

        return Stack.find({}, {
            sort: {
                priority: -1
            }
        }).fetch().filter(function(stack) {
            var stackMatch = regExpFilter && regExpFilter.test(JSON.stringify(stack));
            stack.tasks = getTasksFor(stack._id);
            return stack.tasks.length > 0 || stackMatch;
        });
    }
});

Template.stacks.rendered = function() {
    $(".stackSortable").each(function() {
        $(this).sortable({
            placeholder: "stack-sort-highlight",
            handle: ".stackSortHandle"
        });
        $(this).disableSelection();
    });
}