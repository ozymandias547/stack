Meteor.publish('stack', function() {
	return Stack.find();
});

if(!Stack.find().count()) {
    Stack.insert({
       name: "Home",
       tasks: ["Do this", "do that", "Do the other thing"]
    });

    Stack.insert({
       name: "Work",
       tasks: ["Do More!", "Get paid less?"]
    });
}
