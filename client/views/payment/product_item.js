Template.productItem.events({
  'click .buy-product': function() {
    
    //console.log($(e.target).find('[name=amount]').val());
    var product = Products.findOne(this._id);
    
  
  //console.log(Session.get("productNumber"));

    return Meteor.call('createPaypalPayment', product, function(err, res) {
      
      return window.location.replace(res.links[1].href);
    });
  }
});

Template.DashboardPaymentPaypalExecute.created = function() {
  var payerId;
  payerId = window.location.search.split('PayerID=')[1];
  return Meteor.call('executePaypalPayment', payerId, function(err, res) {
    if (res.state === 'approved') {
      alert('Your payment has been successfully executed.');
    } else {
      alert('Your payment has been refused.');
    }
    console.log(res);
    console.log(res.transactions[0].related_resources[0].sale.links[1].href);
    url = res.transactions[0].related_resources[0].sale.links[1].href
    invoice =
    {
      refundURL: url,
      ptitle: res.transactions[0].item_list.items[0].name ,
      amount: res.transactions[0].item_list.items[0].price,
      time: Date.now()
    }
    Meteor.call('makeInvoice', invoice, function(err, res){
      console.log("invoice made");
       Router.go('DashboardRoot');
    });
    
    /*return Meteor.call('executeRefund', url, function(error, result){
      if(result)
        console.log("Refund");
      else if(error)
        console.log("error");
      else
        console.log("IDK"); 
    })*/
});

    

    Session.set("paymentAmount", 0)
   
    return 0;
  
};