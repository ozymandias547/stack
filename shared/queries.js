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