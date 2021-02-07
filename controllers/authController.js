const passport =require('passport');
const db =require('../models/index');

function router(app){

    app.get("/login", (req, res) => {
        if(req.user){
        return res.redirect('/products')
        }
        res.render('/login')
      
    });
    app.post('/login',passport.authenticate('local',{
        successRedirect:'/products',
        failureRedirect:'/login'
    }));

    app.get('/signup',(req,res)=>{
        if(req.user){
            return res.redirect('/products')
        }
        res.render('/signup')
    });

    app.post('/signup',(req,res,next)=>{
        // passed tests 
        db.User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email, 
            pwd:req.body.pwd
        }).then((user)=>{
            res.json(user);
           return req.login(user,(err)=>{
                if(err){
                    return next(err )
                } 
                res.redirect('/login')
            })
            res.redirect('/products')
            
        }).catch((err)=>{
             res.redirect('/signup')
             next(err)
        })
    })
    
    app.get('/logout',(req,res)=>{
        req.logout(); 
        res.redirect('/login')
    })
}
module.exports=router; 
