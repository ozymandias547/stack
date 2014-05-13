Meteor.startup(function() {

    Accounts.loginServiceConfiguration.upsert({
        service: 'facebook'
    }, {
        service: 'facebook',
        appId: '696946783695522',
        secret: '013263524c094cfb28dbf4da260280b5'
    });

});