Template.stacks.helpers({
    stacks: function() {
        var regExpFilter = buildRegExpFromUserFilter(Session.get('regExpFilter'));

        return Stack.find({}, {
            sort: {
                priority: -1
            }
        }).fetch().filter(function(stack) {
            stack.filterMatch = regExpFilter && regExpFilter.test(JSON.stringify(stack));
            stack.tasks = getTasksFor(stack._id);
            return !regExpFilter || stack.tasks.allFiltered.length > 0 || stack.filterMatch;
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