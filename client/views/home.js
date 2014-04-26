// controller for home.html
document.title = "Stack Home";

var NULL = "null";

Deps.autorun(function() {
    Meteor.subscribe("stacks", Meteor.userId());
});

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
    "keydown .stackRowAddInput": function(event) {
        var input = document.getElementById('stackRowAddInput');
        if (event.keyCode == 13) {
            Stack.insert({
                userId: Meteor.userId(),
                name: input.value
            });
            input.value = '';
            input.style.display = 'none';
        }
    },
    "click .stackRowAddInput": function(event) {
        var input = document.getElementById('stackRowAddInput');
        input.style.display = 'inline';
        input.focus();
    },
    "click .stackRowRemove": function(event) {
        var stackId = event.target.id;
        console.log(stackId);
        Stack.remove({
            _id: stackId
        });
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