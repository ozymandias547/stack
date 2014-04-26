Task = new Meteor.Collection('task');

Task.allow({
    insert: function(userId, stackId, name) {
        return true;
    },
    remove: function(userId, stackId, name) {
        return true;
    },
    update: function(userId, stackId, name) {
        return true;
    }
});