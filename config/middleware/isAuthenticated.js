// checking if the user is authenticated
module.exports=(req,res,next)=>{ 
    if(req.user){
        return  next();
    }
    // if not logged in return to the login page 
    return res.redirect("/login")
}