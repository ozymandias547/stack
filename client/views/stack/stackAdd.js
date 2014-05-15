Template.stackAdd.events({
    "mousedown .stackInitAdd": function(event, template) {
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackButton = $(template.find(".stackInitAdd"));

        $addStackInputs.removeClass('hidden');
        $addStackButton.addClass('hidden');
        $addStackNameInput.focus();
    },
    "mousedown .StackAddSubmit": function(event, template) {
        event.stopImmediatePropagation();

        var $addStackButton = $(template.find(".stackInitAdd"));
        var $addStackInputs = $(template.find(".StackAddInputs"));
        var $addStackNameInput = $(template.find(".StackAddNameInput"));
        var $addStackDescInput = $(template.find(".StackAddDescInput"));
        var $originalButton = $(template.find("#stackRowAddInputButton"));

        if ($addStackNameInput.val() !== undefined) {
            var max = Stack.find({}, {
                sort: {
                    priority: -1
                }
            }).fetch()[0].priority;

            console.log("adding!");
            Stack.insert({
                userId: Meteor.userId(),
                name: $addStackNameInput.val(),
                description: $addStackDescInput.val(),
                collaboratorIds: [],
                priority: max + 1
            });
        }

        $addStackNameInput.val('');
        $addStackDescInput.val('');
        $addStackInputs.addClass('hidden');
        $addStackButton.removeClass('hidden');

        $originalButton.focus();
    },
    "mousedown .StackAddCancel": function(event, template) {

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