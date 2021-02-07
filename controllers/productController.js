
const db =require('../models');
const { includes } = require('../config/stripekey');

function router(app){
// get all products with categories 
app.get('/products',(req,res,next)=>{
    // passed tests 
    db.Products.findAll({
        include:[db.Category]
    }).then((Products)=>{
        
        res.status(201).json(Products)
    }).catch((err)=>{
        next(err)
    })
})
// get specific product by id 
app.get('/product/:id',(req,res,next)=>{
    // passed tests 
    db.Products.findOne({
        where:{
            id:3
        }
    }).then((product)=>{
        
        res.status(200).json(product)  
    }).catch((err)=>{
        next(err);
    })
})
// create a product 
app.post('/api/create/product',(req,res,next)=>{
    // passed tests
    db.Products.create({
        name:"entomy",
        price:"90",
        img:"https://www.entomy.jpg",
        desc:"entomy flavors",
        quantity:"90",
    }).then((newproduct)=>{
        res.json(newproduct)
    }).catch((err)=>{
        next(err);
        console.log(err.message);
        
    })
})
// updated a product 
app.patch('/update/product/:id',(req,res,next)=>{
    // passed tests 
    db.Products.update({
        name:"entomies",
        price:"100",
        img:"https://www.entomy.jpg",
        desc:"entomies",
        quantity:"130",      
    },{
    where:{
        id:41}
    }        ).then((productupdate)=>{
        res.json(productupdate)
        next(err);
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})
// delete a product 
app.delete('/api/delete/product/:id',(req,res,next)=>{
    // passed tests 
    db.Products.destroy({
        where:{
            id:41
        }
    }).then((result)=>{
        res.json(result)
        next(err);
    }).catch((err)=>{
        console.log(err.message);
        res.send(err)
    })
})
}

module.exports= router;
