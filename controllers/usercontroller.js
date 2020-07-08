const db =require('../models');
function isloggedin(){
    if(req.authenticated())
    return next();
    res.redirect('/login');
}
function router(app){
// returns all users for admin 
    app.get('/users',(req,res)=>{
        db.Users.findAll({}).then((users)=>{
            res.render('Users',{Users,user:req.user});

        }).catch((err)=>{
            console.log(err.message);
            res.send(err)
        })
    });

    // return specific user

    app.get('/users/:id',isloggedin,(req,res)=>{
        db.Users.findOne({
            where:{
                id:req.params.id
            }
        }).then((userinfo)=>{
            res.render('userinfo',{userinfo,user:req.user})
        }).catch((err)=>{
            console.log(err.message);
            res.send(err)
        })
    });

    // view account of the current user
    app.get('/account',isloggedin,(req,res)=>{
        res.render('userupdate',{
            userinfo:req.user,
            user:req.user
        })
    });

    // create a new user 
    app.post('/users',(req,res)=>{
        db.Users.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        }).then((result)=>{
            res.redirect('/users')
            }).catch((err)=>{
                console.log(err.message);
                res.send(err)
            });
        });
    

    // Update a user
    app.put('/users',isloggedin,(req,res)=>{
        db.Users.update({
            firstname:req.body.firstname,
            lastname:req.bod.lastname,
            email:req.body.email
        },{
            where:{
                id:req.params.id
            }
        }).then((result)=>{
            res.redirect('/users')
        }).catch((err)=>{
            console.log(err.message);
            res.send(err)
        });
    });

// delete user 
app.get('/users',isloggedin,(req,res)=>{
    db.Users.destroy({
        where:{
            id:req.params.id
        }
    }).then((result)=>{
        res.redirect('/users')
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})

}

module.exports=router;