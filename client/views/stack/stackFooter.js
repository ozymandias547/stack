Template.stackFooter.events({
    "click .StackRemove": function(event, template) {
        if (confirm("Are you sure you would like to remove this stack?"))
            Stack.remove({
                _id: this._id
            });
    }
});