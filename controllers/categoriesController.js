
const db =require('../models');

function router(app){

// get all categories
app.get('/categories',(req,res,next)=>{
    // passed tests
    db.Category.findAll({})
    .then((category)=>{
        res.status(200).json(category);
    }).catch((err)=>{
        next(err)
    });
})
// returns product by category name 
app.get("/productcategory/name",(req,res,next)=>{
    // passed tests 
    db.Products.findAll({
        where:{
            CategoryId:1
        },
        include:[db.Category]

    }).then((Products)=>{
        
        res.status(201).json(Products)
    }).catch((err)=>{
        next(err)
    })
})

// create anew category
app.post('/category/create',(req,res)=>{
    // passed test
    db.Category.create({
        name:"coolcool"
    }).then((result)=>{
        res.status(201).json(result)     
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})
}
module.exports=router
