const express = require('express');
const app = express();


// require mongoose file
require('./db-utils/connect');


// connect the controllers
const hrController = require('./controllers/controller');


// require all packages
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/'+ 'human-resources',
    collection: 'mySessions'
});

// require controllers
const controller = require('./controllers/controller');

// require models
// const Employee = require('./Models/employee');
// const HRUsers = require('./Models/hrUsers');

////// middleware

// log where there is a request coming in
app.use(require('./middleware/logger'));

// enable method override
app.use(methodOverride('_method'));

// create a session
app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

//////// login info goes here:
const isLoggedIn = require('./middleware/isLoggedIn');
app.use(async (req, res, next)=>{
    // This will send info from session to templates
    res.locals.isLoggedIn = req.session.isLoggedIn
    if(req.session.isLoggedIn){
        const currentUser = await User.findById(req.session.userId)
        res.locals.username = currentUser.username
        res.locals.userId = req.session.userId.toString()
    }
    next();
});

// random lines of code idk about yet
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/hrUser', isLoggedIn, hrController);
app.use('/employees', hrController);



app.listen(3000, ()=>{
    console.log('express is listening!');
});
