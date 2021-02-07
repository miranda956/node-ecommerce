const db =require('../models');
function isloggedin(){
    if(req.authenticated())
    return next();
    res.redirect('/login');
}
function router(app){
    
// returns all users for admin 
    app.get('/api/get/users',(req,res,next)=>{
        // passed tests 
        db.User.findAll({}).then((users)=>{
            res.status(201).json(users);
        }).catch((err)=>{
            next(err);
        });
    });

    // return specific user and his his details 

    app.get('/api/user/:id',(req,res,next)=>{
        // passed tests 
        db.User.findAll({
        attributes:['firstname','lastname','email'],
        where:{
            id:2
        }
        }).then((userinfo)=>{
            res.json(userinfo)
        }).catch((err)=>{
            next(err);
        })
    });

    // create a new user 
    app.post('/create/users',(req,res,next)=>{
        // passed tests
        db.User.create({
            firstName:"merri",
            lastName:"mureti",
            email:"musularonald@gmail.com",
            pwd:"r4etcdvcvdcv"
        }).then((result)=>{
            res.status(201).json(result)
            }).catch((err)=>{
                next(err);
            });
        });
    

    // Update a user
    app.patch('/user/update',(req,res,next)=>{
        // passed tests
        db.User.update({
            firstName:"mike",
            lastName:"musita",
            email:"musita@gmail.com"
        },{
            where:{
                id:13
            }
        }).then((result)=>{   
            res.json(result)   
        }).catch((err)=>{
            next(err);
        });
    });



}
module.exports=router;
