var mongoose =require("mongoose");
var Campground =require("./models/campgrounds");
var Comment =require("./models/comments");
var data = [
    {name:"MArika MArikakk",
    image:"https://www.newzealand.com/assets/Tourism-NZ/Nelson/ba40378fe9/img-1536928144-4748-13836-F53C3949-ED9E-E0DC-CF6EC0D789D9308A__FocalPointCropWzI0MCw0ODAsNTAsNTAsNzUsImpwZyIsNjUsMi41XQ.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {name:"Mallbelic Point",
    image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {name:"Nature's Den",
    image:"https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {name:"Fortuna Giant",
    image:"https://www.floridastateparks.org/sites/default/files/styles/single/public/media/image/FSP_Wekiva-5693_STEdg3mimRVebehjzluF8ls18q0ABlZBh_0.jpg?itok=doP4jJMZ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}
    
]
function seedDB(){
    //Remove all CAmpgrounds
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // else{
        //    console.log("removed campground"); 
        //    //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("added a campground");
        //                 //create a comment
        //                 Comment.create({
        //                     text:"This place is great,but i wish there was internet",
        //                     author:"himer"
        //                 },function(err,comment){
        //                     if(err){
                                
        //                         console.log(err);
        //                     }
        //                     else{
        //                         console.log("created a new comment");
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                     }
        //                 });
                        
        //             }
        //         });
        //     });
        // }
    });
    
    
}
module.exports =seedDB;
