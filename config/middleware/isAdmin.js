// checking if the user is Admin
module.exports=(req,res,next)=>{
    if(req.User.isAdmin)
        return next();
    
    // 
    return res.redirect("/")
}
