
const db =require('../models');

function router(app){
// get all products
app.get('/products',(req,res)=>{
    db.sequelize.all([
        db.Products.findAll({}),
        db.Categories.findAll({})

    ]).spread((Products,Categories)=>{
        res.render('products',{
            Products,Categories,user:req.user
        })
    })
})
// get specific product by id 
app.get('product/:id',(req,res)=>{
    db.Products.findOne({
        where:{
            id:req.params.id
        }
    }).then((product)=>{
        res.render('product',{product,user:req.user,id:req.params.id})
    })
})
// create a product 
app.post('product',(req,res)=>{
    db.Products.create({
        productname:req.body.productname
    }).then(()=>{
        res.redirec('/products')
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})
// updated a product 
app.put('product/:id',(req,res)=>{
    db.Products.update({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('product'+id)
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})
// delete a product 
app.delete('product/:id',(req,res)=>{
    db.Products.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/products')
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})


}
module.exports= router;