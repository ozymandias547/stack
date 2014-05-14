Actions = new Meteor.Collection('action');

/**
 * userId: the user who initiated this action (the 'owner')
 * timeStart: epoch time of action start
 * timeEnd: epoch time of completion
 * type: the type of action (we should have a library of action types and these should
 *       probably be numbers so that they are an easier lookup in hashes)
 * stackIds: the stackIds associated with this action. Normally will be only 1, but could be
 *           more if a batch action is done (e.g. delete a bunch of stacks at once)
 * taskIds: the taskIds associated with this action. Normally will be only 1, but could be
 *           more if a batch action is done (e.g. delete a bunch of stacks at once)
 * tagIds: the tagIds associated with this action. Normally will be only 1, but could be
 *           more if a batch action is done (e.g. delete a bunch of stacks at once)
 */
Actions.allow({
    insert: function(userId, timeStart, timeEnd, type, stackIds, taskIds, tagIds) {
        return true;
    },
    remove: function() {
        return false;
    },
    update: function(userId, timestamp, type, contributorIds, stackIds, taskIds, tagIds) {
        return true;
    }
});