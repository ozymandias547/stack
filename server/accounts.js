Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;
    return user;
});

Accounts.onLogin(function(attemptLoginInfo) {
    return null;
});