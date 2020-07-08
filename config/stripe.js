const stripe=require("stripe")(require("./stripekey"));
module.exports=stripe;