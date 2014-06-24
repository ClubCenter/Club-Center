Errors = new Meteor.Collection(null);

throwError = function(message) {

	Errors.insert({message: message, seen: false})
	console.log("error received");
}

clearErrors = function() {

	Errors.remove({seen:true});
}