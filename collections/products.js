Products = new Meteor.Collection("products");

Products.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Meteor.methods({
	addProduct: function(productAttributes){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to add product");

		if(!productAttributes.title)
			throw new Meteor.Error(422, 'Please add product title');


		

		var product = _.extend(_.pick(productAttributes, 'title', 'description','price'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			
		});
		var productId = Products.insert(product);

		return productId;
	}	
});