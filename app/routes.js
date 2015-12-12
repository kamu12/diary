module.exports = function(app, passport, Note, db, ObjectId) {
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
        failureFlash : true,
        session: true
    }));

    //signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to secure profile section
            failureRedirect : '/signup', // redirect back to signup page in case of error
            failureFlash : true,
            session: true
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
    
    app.get('/createnote', function(req, res) {
        res.render('create.ejs');
    });
    
    app.get('/editnote', function(req, res) {
        res.render('edit.ejs');
    })
    
    app.post('/notes', function(req, res) {
        console.log(req.body.email);
        Note.find({ userEmail: req.body.email}, function(err, results) {
           res.send(results); 
        });
    });
    
    app.post('/notes/create', function(req, res) {
       console.log("I'm inside notes create");
       var someNote = {
           userEmail: req.body.email,
           date: req.body.date,
           text: req.body.message
       }
       console.log(someNote.userEmail + " " + someNote.date + " " + someNote.text);
       db.collection("notes").insert(someNote, function(err, records) {
                if(!err) {
                    console.log("Record added as "+records[0]._id);
                    res.send(records[0]._id);
                }
            });
    });
    
    app.post('/notes/get', function(req, res) {
        console.log(req.body._id);
        db.collection("notes").findOne({ "_id" : new ObjectId(req.body._id) }, function(err, data) {
            if(!err) {
                res.send(data);
            }
        })
    });
    
    app.post('/notes/edit', function(req, res) {        
        console.log(req.body._id);
        db.collection("notes").update({ "_id" : new ObjectId(req.body._id) }, 
        { "text" : req.body.message, "date" : req.body.date, "userEmail": req.body.email }, function(err, data) {
            if (err && err.code === 'ENOENT') { 
                res.status = 404; // file does not exist
            } else if (err) { 
                console.log('Some other error: ', err.code);
                res.status = 500; // unknown error occurred
            } else { 
                res.status = 204; // file was found
            }
            res.end();
        })
    });
};

// check ifuser is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
        
    res.redirect('/');
}
