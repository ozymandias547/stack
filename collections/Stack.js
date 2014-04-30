Stack = new Meteor.Collection('stack');

Stack.allow({
    insert: function(userId, name, shareUserIds) {
        return true;
    },
    remove: function(userId, name, shareUserIds) {
        return true;
    },
    update: function(userId, name, shareUserIds) {
        return true;
    }
});