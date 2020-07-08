
const bcrypt=require('bcrypt');
module.exports=(sequelize,Datatypes)=>{
    const User=sequelize.define("User",{
        firstName:{
            type:Datatypes.STRING,
            allowNull:false
        },
        lastName:{
            type:Datatypes.STRING,
            allowNull:false
        },
        email:{
            type:Datatypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        pwd:{
            type:Datatypes.STRING,
            allowNull:false,
            validate:{
                len:[8]
            }
        },
        isAdmin:{
            type:Datatypes.BOOLEAN,
            defaultValue:false
        }

    },
    {
        classMethods:{
            associate:(models)=>{
                User.hasMany(models.Cart);
                User.hasMany(models.Order)
            }
        },
        instanceMethods:{
            validpassword:function(pwd){
                return bcrypt.compareSync(pwd,this.pwd);
            }
        },
     /* hooks:{
           beforecreate: (user,options,cd)=>{
                user.pwd=bcrypt.hashSync(user.pwd,
                    bcrypt.genSaltSync(10),null);
                    cb(null,options)
            } 
        }  */
    },
    ); 
    User.beforeCreate((user,options,cb)=>{
        user.pwd=bcrypt.hashSync(user.pwd,
            bcrypt.genSaltSync(10),null);
            cb(null,options)
    })
    return User;
}