Meteor.startup(function() {

    Accounts.loginServiceConfiguration.upsert({
        service: 'google'
    }, {
        service: 'google',
        clientId: '643214640641-mb3urmmre5d06n2k02fjulct70e5a6q9.apps.googleusercontent.com',
        secret: 'AlMkP_BH4SQ2ju4ItpIKba2c'
    });

});