Meteor.publish('stacks', function(userId) {
    if (userId === undefined) {
        return null;
    }

    var count = Stack.find({
        userId: userId
    }).count();

    console.log("Stacks for userId: " + userId + " :" + count);

    if (count == 0) {
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

    return getStacksForUserId(userId);
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

Meteor.publish("userConnections", function() {
    console.log("-----PUBLISH USER CONNECTIONS-----");

    if (this.userId) {
        return userConnectionsForUserId(this.userId);
    } else {
        console.log("Not logged in yet.");
    }

    this.ready();

    console.log("-----/END PUBLISH USER CONNECTIONS-----");
});

Meteor.publish("userData", function() {
    console.log("-----PUBLISH LOGGED IN USER DATA-----");
    console.log(this.userId);
    if (this.userId)
        return Meteor.users.find({
            _id: this.userId
        });
    this.ready();
    console.log("-----/END PUBLISH LOGGED IN USER DATA-----");
});