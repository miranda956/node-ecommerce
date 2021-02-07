module.exports=(sequelize,Datatypes)=>{
    const Order=sequelize.define("Order",{
        
        orderId:{
            type:Datatypes.INTEGER,
        },
        quantity:{
            type:Datatypes.INTEGER
        },
        purchase_price:{
            type:Datatypes.DECIMAL(10,2)
        },
        cclast:{
            type:Datatypes.INTEGER
        }
    },
    {
        freezeTableName:true,
        timestamps:false
    }
    );
    Order.associate=function(models){
        Order.belongsTo(models.User,{
            foreignkey:{
                allownull:false
            } 
        });
        Order.belongsTo(models.Products,{
            foreignkey:{
                allownull:false
            }
        });
        Order.belongsTo(models.Billing,{
            foreignkey:{
                allownull:false
            }
        });
        Order.belongsTo(models.Shipping,{
            foreignkey:{
                allownull:false
            }
        }) 
 
    }    
return Order;
}

