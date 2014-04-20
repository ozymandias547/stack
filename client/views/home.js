// controller for home.html
document.title = "Stack Home";

Meteor.subscribe("stack");

Session.set("selected", "none");

Template.home.helpers({
	stacks : function() {
		return Stack.find().fetch();
	},
	tasks : function() {
		
		var selected = Session.get("selected");

		if (selected!=="none"){
			console.log(Stack.findOne({ _id : selected }).tasks);
			return Stack.findOne({ _id : selected }).tasks;
		}
		else return [];
	}
})

Template.home.events({
	"keydown .addStack" : function(event) {
		console.log(event);
		if (event.keyCode==13 && event.target.value !== "") {
			Stack.insert({ name: event.target.value});
			event.target.value = "";
		}
	},
	"click .deleteStack" : function(event) {
		var confirmed = confirm("Are you sure?");
		if (confirmed) Stack.remove(this._id);
	},
	"click .stack" : function(event) {
		$(".stack.selected").each(function() { $(this).removeClass("selected") });
		$(event.currentTarget).addClass("selected");
		Session.set("selected", this._id);
	},
	"click .addTask" : function(event) {
		var selected = Session.get("selected");

		if (selected!=="none") {
			Stack.update(selected, { $push: { tasks: "hi" } })
		}
	}
});
