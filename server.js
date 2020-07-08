const express=require('express');
const exhbs=require("express-handlebars");
const session=require('express-session');
const logger =require("morgan");
const bodyparser=require("body-parser");
const methodoverride=require("method-override");
const cookieparser=require('cookie-parser');
const path= require('path');
const passport =require("./config/Passport");
const PORT=process.env.PORT|| 4040;
const app =express();
const db=require("./models");
app.use(logger("dev")); 
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(methodoverride("_method"));
app.use(session({
    secret:'12345',
    resave:true,
    saveUninitialized:true
}));
app.use(cookieparser());
app.use('public',express.static(path.join(__dirname,'./public')));
app.set('views',path.join('./views'));
app.engine('.hbs',exhbs({
    defaultLayout:'main',
    extname:'hbs',
    layoutsDir:'./views/layouts',
    partialsDir:'./views/paertials',
    helpers:{
        // helpers in handlebars 
        grouped_each: function(every, context, options) {
		    var out = "", subcontext = [], i;
		    if (context && context.length > 0) {
		        for (i = 0; i < context.length; i++) {
		            if (i > 0 && i % every === 0) {
		                out += options.fn(subcontext);
		                subcontext = [];
		            }
		            subcontext.push(context[i]);
		        }
		        out += options.fn(subcontext);
		    }
		    return out;
			},
			json: function(context) {
			    return JSON.stringify(context);
			}
    }

}))

app.set('view engine','exhbs');

db.sequelize.sync({force:false}).then(function(){
	app.listen(PORT,function(){
		console.log(`application running on the port ${PORT}`);
	});
})