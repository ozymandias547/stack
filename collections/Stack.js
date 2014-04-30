Stack = new Meteor.Collection('stack');

Stack.allow({
    insert: function(userId, name, contributorIds, description) {
        return true;
    },
    remove: function(userId, name, contributorIds, description) {
        return true;
    },
    update: function(userId, name, contributorIds, description) {
        return true;
    }
});