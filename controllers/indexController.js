function route(app){
    app.get('/',(req,res)=>{
        res.send('/products')
    })
}
module.exports=router;