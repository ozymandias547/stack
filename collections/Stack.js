Stack = new Meteor.Collection('stack');

Stack.allow({
    insert: function(userId, name, contributorIds, description, state) {
        return true;
    },
    remove: function() {
        return false;
    },
    update: function(userId, name, contributorIds, description, state) {
        return true;
    }
});