Template.stacks.helpers({
    stacks: function() {
        return Stack.find().fetch();
    },
});