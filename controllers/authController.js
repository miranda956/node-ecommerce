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

    app.post('/signup',(req,res)=>{
        db.User.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        }).then((user)=>{
            return req.login(user,(err)=>{
                if(err){
                    return next(err)
                }
                res.redirect('/login')
            })
            res.redirect('/products')
        }).catch((err)=>{
            res.redirect('/signup')
        })
    })
    
    app.get('/logout',(req,res)=>{
        req.logout(); 
        res.redirect('/login')
    })
}
module.exports=router; 