Meteor.publish('stacks', function(userId) {
    var count = Stack.find({
        userId: userId
    }).count();

    if (userId === undefined) {
        return null;
    }

    console.log("Stacks for userId: " + userId + " :" + count);

    if (!count) {
        Stack.insert({
            name: "Home",
            userId: userId,
            tasks: []
        });

        Stack.insert({
            name: "Work",
            userId: userId,
            tasks: []
        });
    }

    return Stack.find({
        userId: userId
    });
});

Meteor.publish('tasks', function(stackId) {
    return Task.find({
        stackId: stackId
    });
});