// controller for home.html
document.title = "Stack Home";

var NULL = "null";

Meteor.subscribe("stack");

Session.set("selectedID", NULL);

Template.home.helpers({
    stacks: function() {
        return Stack.find().fetch();
    },
    tasks: function() {
        return Session.get("selectedID") !== NULL ? Stack.findOne({
            _id: Session.get("selectedID")
        }).tasks : [];
    }
});

Template.home.events({
    "keydown .addStack": function(event) {
        if (event.keyCode == 13 && event.target.value !== "") {
            Stack.insert({
                name: event.target.value
            });
            event.target.value = "";
        }
    },
    "click .deleteStack": function(event) {
        if (confirm("Are you sure?")) {
            Stack.remove(this._id);
        }
    },
    "click .stack": function(event) {
        $(".stack.selected").each(function() {
            $(this).removeClass("selected")
        });
        $(event.currentTarget).addClass("selected");
        Session.set("selectedID", this._id);
    },
    "click .addTask": function(event) {
        if (Session.get("selectedID") !== NULL) {
            Stack.update(selected, {
                $push: {
                    tasks: "hi"
                }
            });
        }
    }
});