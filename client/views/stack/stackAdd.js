Template.stackAdd.events({
    "click .StackAdd": function(event, template) {
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackButton = $(template.find(".StackAddButton"));

        $addStackInputs.removeClass('hidden');
        $addStackButton.addClass('hidden');
        $addStackNameInput.focus();
    },
    "click .StackAddCommitButton": function(event, template) {
        event.stopImmediatePropagation();

        var $addStackButton = $(template.find(".StackAddButton"));
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackDescInput = $(template.find(".StackAddDescInput"));

        if ($addStackNameInput.val() !== undefined) {
            Stack.insert({
                userId: Meteor.userId(),
                name: $addStackNameInput.val(),
                description: $addStackDescInput.val(),
                collaboratorIds: []
            });
        }

        $addStackNameInput.val('');
        $addStackDescInput.val('');
        $addStackInputs.addClass('hidden');
        $addStackButton.removeClass('hidden');
    }
});