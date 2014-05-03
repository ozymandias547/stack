Meteor.publish('stacks', function(userId) {
    if (userId === undefined) {
        return null;
    }

    var count = Stack.find({
        userId: userId
    }).count();

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

Meteor.publish("userData", function() {
    if (this.userId) {
        var self = this;
        var userIds = [];
        var userIdsMap = {};

        var stacks;
        (stacks = getStacksForUserId(this.userId)).fetch().forEach(function(stack) {
            userIdsMap[stack.userId] ? null : userIds.push(stack.userId);
            userIdsMap[stack.userId] = true;
            if (stack.collaboratorIds)
                stack.collaboratorIds.forEach(function(contributorId) {
                    userIdsMap[contributorId] ? null : userIds.push(contributorId);
                    userIdsMap[contributorId] = true;
                });
        });

        stacks.observeChanges({
            changed: function(id, fields) {
                console.log("id: ", id, "fields: ", fields);
                if (fields.collaboratorIds) {
                    for (var i = 0; i < fields.collaboratorIds.length; i++) {
                        var id = fields.collaboratorIds[i];
                        // Does the user not already exist?
                        if (userIds.indexOf(id) == -1) {
                            userIds.push(id);
                            self.added('users', id);
                        } else {
                            self.changed('users', id);
                        }
                    }
                }
            }
        });

        var usersForClient = Meteor.users.find({
            _id: {
                $in: userIds
            }
        });

        return usersForClient;
    }
    this.ready();
});