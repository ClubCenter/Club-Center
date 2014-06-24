Template.DashboardRoot.helpers({
  product: function()
  {
    return Products.find({},{});
  }
});

Template.DashboardRoot.events({
  'click .buy-product': function() {
    var product1;
    var product2;
    //console.log($(e.target).find('[name=amount]').val());
  
      product1 = {
      name: "T-shirt",
      description: 'production description',
      price: 15.00
    }
      product2 = {
      name: "WACFL Fees",
      description: 'production description',
      price: 20.00
    }
  //console.log(Session.get("productNumber"));
  if(Session.get("productNumber")===1)
    return Meteor.call('createPaypalPayment', product1, function(err, res) {
      //console.log(res.links[1].href);
      return window.location.replace(res.links[1].href);
    });
  if(Session.get("productNumber")===2)
    return Meteor.call('createPaypalPayment', product2, function(err, res) {
      //console.log(res.links[1].href);
      return window.location.replace(res.links[1].href);
    });
  }
});

Template.DashboardPaymentPaypalExecute.created = function() {
  var payerId;
  payerId = window.location.search.split('PayerID=')[1];
  return Meteor.call('executePaypalPayment', payerId, function(err, res) {
    if (res === true) {
      console.log('Your payment has been successfully executed.');
    } else {
      console.log('Your payment has been refused.');
    }
    Session.set("paymentAmount", 0)
    return Router.go('DashboardRoot');
  });
};

setVars = function(a){
  //b= a.split("{}")
Session.set("productNumber",a);
//Session.set("paymentName", b)
console.log("product Set");
this.disabled = true;
};

