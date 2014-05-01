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
            collaboratorIds: []
        });

        Stack.insert({
            name: "Work",
            userId: userId,
            collaboratorIds: []
        });

        Stack.insert({
            name: "Play",
            userId: userId,
            collaboratorIds: []
        });
    }

    return Stack.find({
        $or: [{
            userId: userId
        }, {
            collaboratorIds: {
                $all: [userId]
            }
        }]
    });
});

Meteor.publish('tasks', function(userId) {
    stackIds = Stack.find({
        $or: [{
            userId: userId
        }, {
            collaboratorIds: {
                $all: [userId]
            }
        }]
    }).fetch().map(function(stack) {
        return stack._id
    });

    return Task.find({
        stackId: {
            $in: stackIds
        }
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