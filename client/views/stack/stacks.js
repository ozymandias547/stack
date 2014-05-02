Template.stacks.helpers({
    stacks: function() {
        return Stack.find().fetch();
    },
});

Template.stacks.rendered = function() {
	$( ".stackSortable" ).each(function() {
        $(this).sortable({
            placeholder: "stack-sort-highlight",
            handle: ".stackSortHandle"
        });
        $(this).disableSelection();
    });
}