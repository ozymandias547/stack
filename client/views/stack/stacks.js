Template.stacks.helpers({
    stacks: function() {
        var regExpFilter = buildRegExpFromUserFilter(Session.get('regExpFilter'));

        return Stack.find({}, {
            sort: {
                priority: -1
            }
        }).fetch().filter(function(stack) {
            var stackMatch = regExpFilter && regExpFilter.test(JSON.stringify(stack));
            var tasks = getTasksFor(stack._id);
            stack.tasks = stackMatch ? tasks.all : tasks.filtered;
            return !regExpFilter || stack.tasks.length > 0 || stackMatch;
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