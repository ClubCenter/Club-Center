Template.postItem.helpers({
	ownPost: function() {
		var admin = Meteor.userId() === "P8vfMinRLepQMHTFA";
		var owner = this.userId === Meteor.userId();
		return owner;
	},
	inPost: function(){
		return Session.get('currentPost') === this._id;
	}

});
