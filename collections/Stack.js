Stack = new Meteor.Collection('stack');

Stack.allow({
    insert: function(userId, name) {
        return true;
    },
    remove: function(userId, name) {
        return true;
    },
    update: function(userId, name) {
        return true;
    }
});