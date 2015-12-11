module.exports = function(app, passport) {
    // home page
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to secure profile section
        failureRedirect : '/login', // redirect back to signup page in case of error
        failureFlash : true
    }));

    //signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to secure profile section
            failureRedirect : '/signup', // redirect back to signup page in case of error
            failureFlash : true
        }));

    //profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// check ifuser is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
        
    res.redirect('/');
}
