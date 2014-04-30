Meteor.startup(function() {

    Accounts.loginServiceConfiguration.upsert({
        service: 'google'
    }, {
        service: 'google',
        clientId: '643214640641-mb3urmmre5d06n2k02fjulct70e5a6q9.apps.googleusercontent.com',
        secret: 'AlMkP_BH4SQ2ju4ItpIKba2c'
    });

    Accounts.loginServiceConfiguration.upsert({
        service: 'facebook'
    }, {
        service: 'facebook',
        appId: '696946783695522',
        secret: '013263524c094cfb28dbf4da260280b5'
    });

});