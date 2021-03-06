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
		document.getElementById("refund button").innerHTML = "Refunding";

		
		Meteor.call('executeRefund', url, function(err, res){
			if(res)
			{

				alert("Refund Successful")
				console.log(id);
				Invoices.update(id,{$set: {refunded: true}}, function(error){});
			}
			else
			{
				alert("Refund Failed")
				document.getElementById("refund button").innerHTML = "Refund";
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
		}else if(hours === 0)
    {
      return s+ " "+ (hours +12).toString() + t.toString().substring(18,24) + " AM" 
    }else
		{
			return t.toString().substring(4,24) +" AM"
		}
	}
});

