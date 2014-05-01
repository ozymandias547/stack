Template.StackAddTpl.events({
    "click .StackAdd": function(event, template) {
        var $addStackInputs = $(template.find(".AddStackInputs"));
        var $addStackNameInput = $(template.find("#AddStackNameInput"));
        var $addStackButton = $(template.find(".AddStackButton"));

        $addStackInputs.removeClass('hidden');
        $addStackButton.addClass('hidden');
        $addStackNameInput.focus();
    },
    "click .CreateStackButton": function(event, template) {
        event.stopImmediatePropagation();

        var $addStackButton = $(template.find(".AddStackButton"));
        var $addStackInputs = $(template.find(".AddStackInputs"));
        var $addStackNameInput = $(template.find("#AddStackNameInput"));
        var $addStackDescInput = $(template.find("#AddStackDescInput"));

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