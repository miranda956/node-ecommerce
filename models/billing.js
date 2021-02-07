module.exports=function(sequelize,Datatypes){
    const Billing=sequelize.define("Billing",{
        
        billingName:{
            type:Datatypes.STRING,
            allowNull:false
        },
        billingAddress:{
            type:Datatypes.STRING,
            allowNull:false
        },
        billingCity:{
            type:Datatypes.STRING,
            allowNull:false
        },
        billingCounty:{
            type:Datatypes.STRING,
            allowNull:false

        },
        billingZip:{
            type:Datatypes.INTEGER,
            allowNull:false,
            validate:{
                len:[5]
            }
        },
        billingCountry:{
            type:Datatypes.STRING,
            allowNull:false
        },
        billingPhone:{
            type:Datatypes.INTEGER,
            allowNull:false,
            
        }

    },
    {
        freezeTableName:true,
        timestamps:false
    },
    {
        classMethods:{
            associate:function(models){
                billing.hasMany(models.Order)
            }
        }, 
        

    }
    );
    

    return Billing;
}
