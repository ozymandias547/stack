
Template.stackAdd.events({
    "click .stackInitAdd": function(event, template) {
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackButton = $(template.find(".stackInitAdd"));

        $addStackInputs.removeClass('hidden');
        $addStackButton.addClass('hidden');
        $addStackNameInput.focus();
    },
    "click .StackAddSubmit": function(event, template) {
        event.stopImmediatePropagation();

        var $addStackButton = $(template.find(".stackInitAdd"));
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackDescInput = $(template.find(".StackAddDescInput"));
        var $originalButton = $(template.find("#stackRowAddInputButton"));

        if ($addStackNameInput.val() !== undefined) {
            Stack.insert({
                userId: Meteor.userId(),
                name: $addStackNameInput.val(),
                description: $addStackDescInput.val(),
                collaboratorIds: [],
                priority: 0
            });
        }

        $addStackNameInput.val('');
        $addStackDescInput.val('');
        $addStackInputs.addClass('hidden');
        $addStackButton.removeClass('hidden');

        $originalButton.focus();
    },
    "click .StackAddCancel": function(event, template) {

        var $addStackButton = $(template.find(".stackInitAdd"));
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackDescInput = $(template.find(".StackAddDescInput"));
        var $originalButton = $(template.find("#stackRowAddInputButton"));

        $addStackNameInput.val('');
        $addStackDescInput.val('');
        $addStackInputs.addClass('hidden');
        $addStackButton.removeClass('hidden');
        
        $originalButton.focus();
    }
});