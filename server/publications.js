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
            userId: userId
        });

        Stack.insert({
            name: "Work",
            userId: userId
        });
    }

    return Stack.find({
        userId: userId
    });
});

Meteor.publish('tasks', function(userId) {
    return Task.find({
        userId: userId
    });
});

Meteor.publish("userData", function() {
    console.log("-----PUBLISH USER DATA-----");
    console.log(this.userId);
    if (this.userId)
        return Meteor.users.find({
            _id: this.userId
        });
    this.ready();
});