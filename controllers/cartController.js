
const  db =require('../models');
const isauthenticated=require("../config/middleware/isAuthenticated");

function router(app){
    // show cart by  user id
    
    app.get('/api/cart/user/:id',(req,res,next)=>{
        // passed tests 
        db.Cart.findAll({
            where:{
                UserId:1
            },
            include:[db.Products]
        }).then((cartitems)=>{
            res.json(cartitems);
        }).catch((err)=>{
            next(err);
        });
    });
    //add item to cart
    app.post('/cart/:itemid',(req,res,next)=>{
        // passed tests 
        
        db.Cart.create({
            UserId:1,
            ProductId:1,  
            quantity:4
        }).then((additems)=>{
            res.status(201).json(additems)
        }).catch((err)=>{
            next(err)
            console.log(err.message);
            
        });
    });
// update quantity to cart 
app.patch("/cart/:itemid",(req,res,next)=>{
    //passed tests 
    db.Cart.update({
        quantity:16
    },{
        where:{
            UserId:1,
            ProductId:1
        },
        include:[db.Products]
    }).then((cartitems)=>{
        
        res.status(201).json(cartitems)      
    }).catch((err)=>{
        next(err)
        console.log(err.message);
    
    });
});


// delete item from cart 
app.delete('/cart/:itemid',(req,res,next)=>{
    // passed test 
    db.Cart.destroy({
        where:{
            UserId:1,
            id:7
        }
    }).then((cartitems)=>{
        res.status(202).json(cartitems)
    }).catch((err)=>{
        next(err);
        console.log(err.message);
        res.send(err);
    });
});
}
module.exports=router;
