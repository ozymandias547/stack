Template.addTask.events({
    "click .AddTask": function(event, template) {

        console.log(template);

        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));

        $addTaskButton.addClass("hidden");
        $addTaskInput.removeClass("hidden");
        $addTaskInput.focus();
        
    },
    "keydown .AddTaskInput": function(event, template) {
        
        console.log(this);

        var $addTaskButton = $(template.find(".AddTask"));
        var $addTaskInput = $(template.find(".AddTaskInput"));
        
        if (event.keyCode == 13) {
            if ($addTaskInput.value != '') {
                Task.insert({
                    userId: Meteor.userId(),
                    stackId: this._id,
                    name: $addTaskInput.value,
                    priority: 0
                });
            }
            $addTaskInput.value = '';
            
            $addTaskButton.removeClass("hidden");
            $addTaskInput.addClass("hidden");
        }
    }
})