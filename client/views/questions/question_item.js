Template.questionItem.helpers({
	ownQuestion: function() {
		var admin = Meteor.userId() === "NLuorQj5wNt3Sh8Tr";
		var owner = this.userId === Meteor.userId();
		return owner;
	},
	inQuestion: function(){
		return Session.get('currentQuestion') === this._id;
	}


});
