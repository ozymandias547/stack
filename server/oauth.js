
Meteor.startup(function() {
  
  Accounts.loginServiceConfiguration.upsert({ service: 'google' }, {
    service:  'google',
    clientId: '1068648882472.apps.googleusercontent.com',
    secret:   '19ZpPbrvzKyg1gzJLSR2079O'
  });

});
