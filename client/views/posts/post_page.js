Template.postPage.helpers({
	comments: function() {
		return Comments.find({postId: this._id});
	},
	message: function(){
		return this._id.message;
	}

});
