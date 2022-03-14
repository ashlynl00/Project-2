const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const HrUser = require('./models/hrUsers');
const MongoDBStore = require('connect-mongodb-session')(session);
//require('dotenv').config()
const app = express();
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/'+ 'human-resources',
    collection: 'mySessions'
});
require('./db-utils/connect')
const hrController = require('./controllers/userController')
const employeeController = require('./controllers/controller')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(require('./middleware/logger'))
const isLoggedIn = require('./middleware/isLoggedIn')
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(async (req, res, next)=>{
    // This will send info from session to templates
    res.locals.isLoggedIn = req.session.isLoggedIn
    if(req.session.isLoggedIn){
        const currentUser = await User.findById(req.session.userId)
        res.locals.username = currentUser.username
        res.locals.userId = req.session.userId.toString()
    }
    next()
})
app.get('/', (req, res)=>{
    res.render("home.ejs")
})
app.use('/hrUser', isLoggedIn, hrController)
app.use('/employees', employeeController)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('app running')
})



