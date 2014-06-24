Template.invoiceSheet.helpers({
	invoices: function()
	{
		return Invoices.find({}, {sort: {time: -1}});
	}
});

Template.invoiceItem.events({
	'click .del-file': function(e,t)
	{
		var username = this.buyer;
		if(confirm("Do you want to give a refund to " + username + " ?"))
		{
		var url = this.refundURL;
		var id = this._id
		Meteor.call('executeRefund', url, function(err, res){
			if(res)
			{

				console.log('Refund');
				console.log(id);
				Invoices.update(id,{$set: {refunded: true}}, function(error){});
			}
			else
			{
				console.log("Error");
			}
		});
	}
	},
	'click .xyz': function(e,t)
	{
		var username = this.buyer;
		if(confirm("Do you want to give an item to " + username +"?"))
		{
			var id = this._id;
		console.log(id);
		Invoices.update(id,{$set: {received: true}}, function(error){});
		}
	}
});

Template.invoiceItem.helpers({
	formattedTime: function()
	{
		var t = new Date(this.time);
		var hours = t.getHours();
		var s = t.toString().substring(4, 15);
		if(hours > 12)
		{
			return s + " " + (hours-12).toString() + t.toString().substring(18,24) + " PM"
		}else
		{
			return t.toString().substring(4,24) +" AM"
		}
	}
});

