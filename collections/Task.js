Task = new Meteor.Collection('task');

Task.allow({
    insert: function(userId, stackId, doc) {
        return true;
    },
    remove: function(userId, stackId, doc) {
        return true;
    },
    update: function(userId, stackId, doc) {
        return true;
    }
});