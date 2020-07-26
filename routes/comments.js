var express =require("express");
var router =express.Router({mergeParams:true});
var Campground =require("../models/campgrounds"),
    Comment =require("../models/comments");

//NEW ROUTE FOR COMMENTS
router.get("/new",isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })

});
//CREATE ROUTE FOR COMMENTS-POST
router.post("/",function(req,res){
    //look up campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");

        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comments
                    comment.author.id =req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });

        }
    });
  
});
//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
 module.exports = router;
