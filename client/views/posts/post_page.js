Template.postPage.helpers({
	comments: function() {
		console.log(this._id);
		
			Meteor.subscribe('singlePost',Session.get("currentPost"));
		
		return Comments.find({postId: this._id});
	},
	message: function(){
		
			Meteor.subscribe('singlePost',Session.get("currentPost"));
		
		return this._id.message;
	}

});
Template.postPage.rendered = function()
{
	Meteor.subscribe('singlePost',this._id);

};
