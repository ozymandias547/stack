Meteor.publish('stash', function() {
	return Stash.find();
});

if(!Stash.find().count()) {
    Stash.insert({
       name: "Home",
       tasks: ["Do this", "do that", "Do the other thing"]
    });

    Stash.insert({
       name: "Work",
       tasks: ["Do More!", "Get paid less?"]
    });
}
