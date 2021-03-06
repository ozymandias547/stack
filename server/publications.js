function userStackQuery(userId) {
    return Stack.find({
        $and: [{
            $or: [{
                userId: userId
            }, {
                collaboratorIds: {
                    $all: [userId]
                }
            }]
        }, {
            state: {
                $ne: 1
            }
        }]
    });
}

Meteor.publish('stacks', function() {
    if (this.userId === undefined)
        return null;

    return userStackQuery(this.userId);
});

Meteor.publish('tasks', function() {
    if (this.userId === undefined)
        return null;

    var stackIds = userStackQuery(this.userId).fetch().map(function(stack) {
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
                // console.log("id: ", id, "fields: ", fields);
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