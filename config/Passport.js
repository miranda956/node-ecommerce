const passport =require("passport");
const localStrategy=require("passport-local").Strategy;
const googleStrategy=require("passport-google-oauth").OAuth2Strategy;
const db =require("../models");
const facebook=require("passport-facebook").OAuth2Strategy;
/* facebook authentication strategy will be used here*/
/*passport.use("facebook-signup",new FacebookStrategy({
    clientID:'',
    clientsecret:"",
    // redirects to your application running environment
    callbackURL:"http://localhost:4040/auth/facebook/callback",
    enableProof:true
},(accessToken,refreshToken,profile,cb)=>{
    userfindOrCreate({facebookid:profile.id},function(err,user){
        return cb(err,user)
    });
}
    )); */
    /* google  authentincation will go here */
  /*  passport.use('google-signup',new googleStrategy({
        clientID:"445638585229-s97ba5iibcaelg3ckvkc91b11rqd6fs9.apps.googleusercontent.com",
        clientSecret:"-ZTwdAIwHvJiVWyXVIMULmkE",
        callbackURL:"http://localhost:4040/auth/facebook/callback"
    },(accesToken,refreshToken,profile,cb)=>{

    })) */
// local signup
passport.use("local-signup",new localStrategy({
    usernameField:'email',
    passwordField:"pwd"
}, (email,pwd,done)=>{
    db.User.findOne({
        where:{
            email:email
        }
    }).then(function(dbUser){
        console.log(dbUser);
        if(!dbUser){
            return done(null,false,{
                message:"invalid email"
            });
        } else {
            if(!dbUser.verifypassword(pwd)){
                return done (null,false,{
                    message:'incorrect password'
                })
            }
            return done (null,dbUser);
        }
 
   })
}
));
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>  {
    User.findByid(id,(err,user)=>{
        done(err,user)
    });
});
module.exports= passport;
 