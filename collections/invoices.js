Invoices = new Meteor.Collection("invoices");

Invoices.allow({
	update: ownsDocument
});

Meteor.methods({
	makeInvoice: function(invoiceAttributes){
		var user = Meteor.user();

		var invoice = _.extend(_.pick(invoiceAttributes, 'refundURL', 'ptitle', 'amount','time'),{
			buyerId: user._id,
			buyer: user.username,
			//time: Date().now(),
			received: false,
			refunded: false
			
		});

		var invoiceId = Invoices.insert(invoice);

		return invoiceId;
	}

});