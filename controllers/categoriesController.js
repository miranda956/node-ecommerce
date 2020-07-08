
const db =require('../models');

function router(app){

// get all categories
app.get('/categories',(req,res)=>{
    db.Categories.findAll({}).then((categories)=>{
        res.json('/categories')
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)

    })
})
 // show product by category name
 app.post('product/category/:categoryName',(req,res)=>{
     db.sequelize.promise.all([
         db.Product.findAll({
            where:{
                CategoryId:req.body.Categoryid
            }
         }),
         db.Categories.findAll({})
     ]).spread((products,categories)=>{
         res.render('products',{products,categories,user:req.user})
     })
 })
// create anew category
app.post('/category',(req,res)=>{
    db.Categories.create({
        name:req.body.name
    }).then((result)=>{
        res.send('result'+req.body.name )
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})

}
module.exports=router