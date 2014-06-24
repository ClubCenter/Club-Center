Template.productEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentProductId = this._id;
		//console.log(this._url);
		var productProperties = {
			description: $(e.target).find('[name=description]').val(),
			title: $(e.target).find('[name=title]').val(),
			price: Number($(e.target).find('[name=price]').val())
		}
		
		Products.update(currentProductId, {$set: productProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				Router.go('DashboardRoot');
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this product?")) {
			var currentProductId = this._id
			Products.remove(currentProductId);
			Router.go('DashboardRoot');
		}
	}
});
