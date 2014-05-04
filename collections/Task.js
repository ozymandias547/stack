Task = new Meteor.Collection('task');

Task.allow({
    insert: function(userId, stackId, name, priority, shareUserIds, activeUserIds) {
        return true;
    },
    remove: function(userId, stackId, name, priority, shareUserIds, activeUserIds) {
        return true;
    },
    update: function(userId, stackId, name, priority, shareUserIds, activeUserIds) {
        return true;
    }
});