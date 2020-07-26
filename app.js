var express    =require("express"),
    app        =express(),
    bodyParser =require("body-parser"),
    mongoose =require("mongoose"),
    passport =require("passport"),
    localStrategy =require("passport-local"),
    methodOverride =require("method-override"),
    Campground =require("./models/campgrounds"),
    Comment =require("./models/comments"),
    User =require("./models/user"),
    seedDB =require("./seeds");
//requiring routes
var commentRoutes =require("./routes/comments"),
    campgroundRoutes =require("./routes/campgrounds"),
    indexRoutes =require("./routes/index");
//Passport CONFIG
app.use(require("express-session")({
    secret:"I will Win",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//app and mongoose config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/yelp_camp_v9",{useNewUrlParser:true});

// seedDB();//seed the database
app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    next();
});
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);



app.listen(3000,function(){
    console.log("yelpcamp server");
});