module.exports=function(sequelize,Datatypes){
    const Billing=sequelize.define("Billing",{
        id:{
            type:Datatypes.INTEGER,
            autoincrement:true,
            primaryKey: true,
            

        },
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
            validate:{
                len:[10,13]
            }
        }

    },
    {
        classMethods:{
            associate:function(models){
                billing.hasMany(models.Order)
            }
        },
        timeStamp:false

    }
    );
    

    return Billing;
}