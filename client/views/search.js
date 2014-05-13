Template.search.events({
    "keyup .SearchInput": function(event, template) {
        if (event.target.value == '' || event.target.value == undefined) {
            Session.set('regExpFilter', undefined);
            Session.set('stackIdFilter', undefined);
        } else {
            Session.set('regExpFilter', event.target.value);
        }
    }
});