var express =require("express");
var router =express.Router();
var Campground =require("../models/campgrounds");
//INDEX- show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
    
});
//CREATE- create new campground to database
router.post("/",isLoggedIn,function(req,res){
    //get data from form and add to campgrounds array
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author ={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={name:name,image:image,description:desc,author:author};
    //create a new campground and save to database
    Campground.create(newCampground,function(err,campgrounds){
         if(err){
             console.log(err);
         }
         else{
              //redirect to campgrounds page
                res.redirect("/campgrounds");         
    
         }
     });
  
});
//NEW- show form for creating new campground
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});
//SHOW -shows detail about a campground
router.get("/:id",function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);

        }
        else{
            console.log(foundCampground);
            //render show template for that particulat campground
             res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//Destroy ROUTE

router.delete("/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
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
function checkCampgroundOwnership(req,res,next){
        //is user logged in
        if(req.isAuthenticated()){
        
            Campground.findById(req.params.id,function(err,foundCampground){
                
                if(err){
                    res.redirect("/back");
                }else{
                    //does the user own the campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        res.render("campgrounds/edit",{campground:foundCampground});
                    }
                    else{
                        res.redirect("back");
                    }
                    
                    
                }
            });
        }
        else{
           res.redirect("back");
        }
}


module.exports = router;