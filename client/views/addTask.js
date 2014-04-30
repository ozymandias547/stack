

Template.addTask.contributors = function() {

    var friends = Session.get('fbFriends');
    var friendNames = [];

    for (var friend in friends) {
        friendNames.push(friends[friend].name)
    }

    return friendNames;
};

Template.addTask.events({
    
    "click .AddTask": function(event, template) {

        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));

        $addTaskButton.addClass("hidden");
        $addTaskInput.removeClass("hidden");
        
        $addTaskInput.focus();
        
    },

    "keydown .AddTaskInput": function(event, template) {
        
        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));

        if (event.keyCode == 13) {
            if ($addTaskInput.val() != '') {
                
                Task.insert({
                    userId: Meteor.userId(),
                    stackId: this._id,
                    name: $addTaskInput.val(),
                    priority: 0
                });
            }
            $addTaskInput.val("");
            $addTaskButton.removeClass("hidden");
            $addTaskInput.addClass("hidden");   
        }

    },

    "click .stackShare": function(event, template) {


        var $stackShareButton = $(template.find(".stackShare")),
            $stackShareInputContainer = $(template.find(".stackShareInput")),
            $stackShareInput = $stackShareInputContainer.find("input");

        $stackShareButton.addClass("hidden");
        $stackShareInputContainer.removeClass("hidden");
        
        Meteor.typeahead($stackShareInput);

        $stackShareInputContainer.find(".tt-input").focus();


    },

    "keydown .stackShareInput": function(event, template) {
        
        var $stackShareButton = $(template.find(".stackShare"));
        var $stackShareInput = $(template.find(".stackShareInput"));

        if (event.keyCode == 13) {
            if ($stackShareInput.val() != '') {
                
                // Task.insert({
                //     userId: Meteor.userId(),
                //     stackId: this._id,
                //     name: $stackShareInput.val(),
                //     priority: 0
                // });
            }
            $stackShareInput.val("");
            $stackShareButton.removeClass("hidden");
            $stackShareInput.addClass("hidden");   
        }

    },

})

