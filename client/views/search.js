
Template.search.helpers({
	"stackers" : function() {
		if (Session.get("fbFriendsAll"))
			return Session.get("fbFriendsByName");
	}
})

Template.search.rendered = function() {
	Meteor.typeahead.inject();
}


