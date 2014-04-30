Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;

    console.log("------------------------Creating new user------------------------");
    console.log(user);
    return user;
});

Accounts.onLogin(function(attemptLoginInfo) {
    console.log("------------------------User logging in------------------------");
    console.log(attemptLoginInfo);
    return null;
});