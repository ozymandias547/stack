getStacksForUserId = function(userId) {
    return Stack.find({
        $or: [{
            userId: userId
        }, {
            collaboratorIds: {
                $all: [userId]
            }
        }]
    });
}

/*
 * User connections include:
 *
 * 1) Facebook Friends
 * 2) Any owners of stacks for which this person is a contributor.
 * 3) Any contributors for which this person is a stack owner.
 */
userConnectionsForUserId = function(userId) {
    var userIds = [];
    var userIdsMap = {};

    var stacks = getStacksForUserId(userId).fetch().forEach(function(stack) {
        userIdsMap[stack.userId] ? null : userIds.push(stack.userId);
        userIdsMap[stack.userId] = true;
        if (stack.contributorIds)
            stack.contributorIds.forEach(function(contributorId) {
                userIdsMap[contributorId] ? null : userIds.push(contributorId);
                userIdsMap[contributorId] = true;
            });
    });

    return Meteor.users.find({
        _id: userIds[0]
    });
}