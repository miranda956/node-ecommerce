module.exports=(sequelize,Datatypes)=>{
    const Category=sequelize.define("Category",{
        name:{
            type:Datatypes.STRING,
            allowNull:false
        },
        
    },
    {
        classMethods:{
            associate:(models)=>{
                Category.hasMany(models.Product)
            }
        }
    }
    
    );
    return Category;

}