Template.productAdd.events({
	'submit form': function(e) {
		e.preventDefault();
		var product = {
			//url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			price: Number($(e.target).find('[name=price]').val())
		}
		Meteor.call('addProduct', product, function(error, id) {
			if(error){
				throwError(error.reason);
		}else{
			Router.go('DashboardRoot');
		}
		});
		
	}
});

