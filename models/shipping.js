module.exports=(sequelize,Datatypes)=>{
    const Shipping=sequelize.define("Shipping",{
        
        
        shippingName:{
            type:Datatypes.STRING,
            allowNUll:false,
        },
        shippingAddress:{
            type:Datatypes.STRING,
            allowNUll:false
        },
        shippingCity:{
            type:Datatypes.STRING,
            allowNUll:false
        },
        shippingCounty:{
            type:Datatypes.STRING,
            allowNUll:false
        },
        shippingZip:{
            type:Datatypes.INTEGER,
            allowNUll:false,
            validate:{
                len:[5]
            }
        },
        shippingCountry:{
            type:Datatypes.STRING,
            allowNUll:false
        },
       
        orderid:{
            type:Datatypes.INTEGER
        }
    },{
        freezeTableName:true,
        timestamps:false

    },
    
    {
    classMethods:{
        associate:(models)=>{
            Shipping.hasMany(models.Order);
        }
    },

    timestamp:false
    });
return Shipping;
}