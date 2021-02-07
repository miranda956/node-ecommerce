const passport =require("passport");
const localStrategy=require("passport-local").Strategy;
const googleStrategy=require("passport-google-oauth").OAuth2Strategy;
const db =require("../models");
// google authentication
const OAuth=require('./auth');

function extractProfile(profile) { 
    var imageURL = '';
    if (profile.photos && profile.photos.length) {
      imageUrl = profile.photos[0].value;
    }
    return {
      id: profile.id,
      displayName: profile.displayName,
      image: imageUrl
    };
  }
  
  passport.use(new googleStrategy({
      clientID: OAuth.googleAuth.clientID,
      clientSecret: OAuth.googleAuth.clientSecret,
      callbackURL: OAuth.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      cb(null, extractProfile(profile));
    }
  ));
    
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
 