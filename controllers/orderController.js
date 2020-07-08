
var db = require("../models");
var stripe = require('../config/stripe.js');
var isAuthenticated = require('../config/middleware/isAuthenticated.js');
var sequelize = require('sequelize');

// ROUTES
function router(app) {

  // show all orders for current user
  app.get("/orders", isAuthenticated, function(request, response,next) {
    db.Order
      .findAll({
        // calculate total from purchase prices
        // format date from createdAt
        // count number of items in order
        attributes: ['orderId', [sequelize.fn('sum', sequelize.col('Order.purchasePrice')), 'orderTotal'],[sequelize.fn('date_format', sequelize.col('Order.createdAt'), '%m-%d-%y'), 'formattedDate'], [sequelize.fn('count', sequelize.col('Order.quantity')), 'itemCount']],
        // group results
        group: ['Order.orderId','formattedDate'],
        where: {
          UserId: request.user.id
        }
        // },
        // include: [db.Product, db.Shipping, db.Billing]
      })
      .then(function(allOrders) {
        response.render('past-orders', {orders:allOrders, user: request.user});
        // response.json(allOrders);
      })
      .catch(function(err) {
        console.error(err.message);
        next(err);
        response.send(err);
      });
  });


  app.get('/orders/:id', isAuthenticated, function(req, res,next) {
    db.Order.findAll({
      where: {
        UserId: req.user.id,
        orderId: req.params.id
      },
      include: [db.Product, db.Shipping, db.Billing]
    }).then(function(orderItems) {
      res.render('past-order', {orderItems: orderItems, user: req.user});
    }).catch(function(err) {
      console.error(err.message);
      res.send(err);
      next(err);
    })
  });

  app.get("/order/", isAuthenticated, function(req, res) {
    res.render('order', { user: req.user });
  });
   
//create order from cart
  app.post("/order/", isAuthenticated, function(request, response) {
    var orderNum;
    var authenticatedUser = request.user.id;
    var ccLast4 = request.body.ccNum.slice(-4);

    getNewOrderId(function(id) {
      orderNum = id + 1;
      createBillingShipping(orderNum, request, response);
    });

    /*
Functions-------------------------------------
*/

    //Creates entries in billing and shipping tables
    function createBillingShipping(orderNum, request) {
      db.Billing
        .create({
          orderId: orderNum,
          billingName: request.body.billingName,
          billingAddress: request.body.billingAddress,
          billingCity: request.body.billingCity,
          billingState: request.body.billingState,
          billingZip: request.body.billingZip,
          billingCountry: request.body.billingCountry,
          billingPhone: request.body.billingPhone
        })
        .then(function(result) {
          db.Shipping 
            .create({
              orderId: orderNum,
              shippingName: request.body.shippingName,
              shippingAddress: request.body.shippingAddress,
              shippingCity: request.body.shippingCity,
              shippingState: request.body.shippingState,
              shippingZip: request.body.shippingZip,
              shippingCountry: request.body.shippingCountry,
              shippingPhone: request.body.shippingPhone
            })
            .then(function(result) {
              console.log("The next operation is being called now");
              getCartContents();
            })
            .catch(function(err) {
              console.log(err.message);
            });
        })
        .catch(function(err) {
          console.log(err.message);
        });
    }

    //gets new order id#
    function getNewOrderId(cb) {
      db.Order
        .findAll({
          order: [["orderId", "DESC"]],
          limit: 1
        })
        .then(function(orderNumber) {
          cb(orderNumber[0].dataValues.orderId);
        });
    }

    //gets cart contents and creates order
    function getCartContents() {
      db.Cart
        .findAll({
          where: {
            UserId: authenticatedUser
          },
          include: [db.Product, db.User]
        })
        .then(function(cartItems) {
        	//if there is something in the users shopping cart
        	if (cartItems.length > 0) {
            //create order from cart items  	
	          for (var i = 0; i < cartItems.length; i++) {

	            db.Order
	              .create({
	                orderId: orderNum,
	                quantity: cartItems[i].quantity,
	                purchasePrice: cartItems[i].Product.price,
	                ccLast4: ccLast4, 
	                BillingId: orderNum,
	                ProductId: cartItems[i].Product.id,
	                UserId: authenticatedUser, 
	                ShippingId: orderNum
	              })
	              .then(function(orders) {});
	          }
	          //place the order through Stripe
	          placeOrder(cartItems);

          }
        })
        .catch(function(err) {
          console.log(err.message);
          // response.send(err);
        });
    }

    function placeOrder(data){
    	var total = 0;
      var email = data[0].dataValues.User.dataValues.email
      var name = data[0].dataValues.User.dataValues.firstName
      var msg = ""

	    // calculate total cost of cart items
	    for (i=0; i < data.length; i++){
	      total += data[i].quantity * data[i].Product.price;
	      console.log ("Total is" + total);
	      console.log("quantity " + data[i].quantity);
	      console.log("price " + data[i].Product.price);
	    }

	    // Authorize CC
      // card declined 4000000000000002  
      // card accepted 4242424242424242
	    var stripeToken = stripe.tokens.create({
	      card: {
	        "number": request.body.ccNum,
	        "exp_month": 12,
	        "exp_year": 2018,
	        "cvc": '123'
	      }
	    }, function(err, token) {
	      if (err) {
	        console.log(err);
	        // asynchronously called
	      } else {
	        stripe.charges.create({
	            amount: (total*100).toFixed(0), //in lowest currency unit
	            currency: "usd",
	            description: "Example charge",
	            source: token.id,
	        }, function(err, charge) {
	          if(err){
	            console.log(err);
              response.render('fail', {user: request.user});
	          } else {
	            console.log(charge);
              // clear the items from the cart
              clearCartContents();
	          }
	        });
	      }
	    });
    }

    function clearCartContents() {
      db.Cart
      .destroy({
        where: {
          userId: authenticatedUser 
        }
      })
      .then(function(result) {
        // response.send("Done--Clearing Cart");
        response.render('success', {user: request.user});
      })
      .catch(function(err) {
        console.log(err.message);
        response.send(err);
      });
    }
  });

  // show order by order id
  app.get("/order/:id", isAuthenticated, function(request, response) {
    db.Order
      .findAll({
        where: {
          orderId: request.params.id
        },
        include: [db.Product, db.Shipping, db.Billing]
      })
      .then(function(orderItems) {
        response.json(orderItems);
      })
      .catch(function(err) {
        console.log(err.message);
        response.send(err);
      });
  });

}

module.exports = router;
