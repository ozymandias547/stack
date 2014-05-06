Task = new Meteor.Collection('task');

Task.allow({
    insert: function(userId, stackId, name, priority, shareUserIds, activeUserIds, state) {
        // TODO Add Validation.
        return true;
    },
    remove: function() {
        return false;
    },
    update: function(userId, stackId, name, priority, shareUserIds, activeUserIds, state) {
        // TODO Add Validation.
        return true;
    }
});