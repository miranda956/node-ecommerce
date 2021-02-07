module.exports=(sequelize,Datatypes)=>{
    const Cart=sequelize.define("Cart",{
        quantity:{
            type:Datatypes.INTEGER,
            allowNull:false,
            validate:{
                len:[0,10]
            },
            required:true
        }
        
    }
    ,{
        freezeTableName:true,
        timestamps:false
    });
    Cart.associate=function(models){
        Cart.belongsTo(models.User,{
            foreignkey:{
                allownull:false
            }
        });
        Cart.belongsTo(models.Products,{
            foreignkey:{
                allownull:false
            }
        });
    }
    return Cart;
}