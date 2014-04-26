Tag = new Meteor.Collection('tag');

Tag.allow({
    insert: function(name) {
        return true;
    },
    remove: function(name) {
        return true;
    },
    update: function(name) {
        return true;
    }
});