module.exports=(sequelize,Datatypes)=>{
const Products=sequelize.define("Products",{
    name:{
        type:Datatypes.STRING,
        allowNull:false
    },
    price:{
        type:Datatypes.DECIMAL(10,2),
        allowNull:false,
        validate:{}
    },
    img:{
        type:Datatypes.STRING,
        allowNull:false,
        validate:{}
    },
    desc:{
        type:Datatypes.TEXT,
        allowNull:false,
        validate:{}
    },
    quantity:{
        type:Datatypes.INTEGER,
        allowNull:false,
        validate:{}
    },
    active:{
        type:Datatypes.BOOLEAN,
        defaultValue:true
    }
},{
    freezeTableName:true,
    timestamps:false
}
);
Products.associate=function(models){
    Products.belongsTo(models.Category,{
        foreignkey:{
            allownull:false
        }
    });
    Products.hasMany(models.Order);
    
    
}
return Products;
}