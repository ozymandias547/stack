// controller for home.html
document.title = "Stash Home";

Meteor.subscribe("stash");

Session.set("selected", "none");

Template.home.helpers({
	stashes : function() {
		return Stash.find().fetch();
	},
	tasks : function() {
		
		var selected = Session.get("selected");

		if (selected!=="none"){
			console.log(Stash.findOne({ _id : selected }).tasks);
			return Stash.findOne({ _id : selected }).tasks;
		}
		else return [];
	}
})

Template.home.events({
	"keydown .addStash" : function(event) {
		console.log(event);
		if (event.keyCode==13 && event.target.value !== "") {
			Stash.insert({ name: event.target.value});
			event.target.value = "";
		}
	},
	"click .deleteStash" : function(event) {
		var confirmed = confirm("Are you sure?");
		if (confirmed) Stash.remove(this._id);
	},
	"click .stash" : function(event) {
		$(".stash.selected").each(function() { $(this).removeClass("selected") });
		$(event.currentTarget).addClass("selected");
		Session.set("selected", this._id);
	},
	"click .addTask" : function(event) {
		var selected = Session.get("selected");

		if (selected!=="none") {
			Stash.update(selected, { $push: { tasks: "hi" } })
		}
	}
});
