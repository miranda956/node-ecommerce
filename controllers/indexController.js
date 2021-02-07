function router(app){
    app.get('/',(req,res)=>{
        res.redirect('/products')
    })
}
module.exports=router;  