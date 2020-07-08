
const  db =require('../models');

function router(app){
    // show cart by  user id
    app.get('/cart',(req,res)=>{
        db.Cart.findAll({
            where:{
                userid:req.user.id
            },
            include:[db.Products]
        }).then((cartitems)=>{
            res.render('cart',{cartitems,user:req.user})
        }).catch((err)=>{
            console.log(err.message);
            res.send(err)
        });
    });
    //add item to cart
    app.post('/cart/:itemid',(req,res)=>{
        db.Cart.create({
            userid:req.user.id,
            productid:req.params.itemid,
            quantity:req.body.quantity
        }).then((additems)=>{
            res.redirect('/products')
        }).catch((err)=>{
            console.log(err.message);
            res.send(err)
        });
    });
// update quantity to cart 
app.put("/cart/:itemid",(req,res)=>{
    db.Cart.update({
        quantity:req.body.quantity
    },{
        where:{
            userid:req.user.id,
            productid:req.params.itemid
        },
        include:[db.Products]
    }).then((cartitems)=>{
        res.redirect('/cart')
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    });
});


// delete item from cart 
app.delete('/cart/:itemid',(req,res)=>{
    db.Cart.destroy({
        where:{
            userid:req.user.id,
            id:req.params.itemid
        }

    }).then((cartitems)=>{
        res.redirect('/cart');
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    });
});
}
module.exports=router;