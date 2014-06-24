Template.commentEdit.helpers({
	comment: function() {
		console.log(this._id);
		return Comments.findOne(this._id);
	},
	originalText: function() {
		return Comments.findOne(this._id).body;
	}
});

Template.commentEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		currentCommentId = Session.get('currentCommentId');

		//console.log(currentCommentId)
		//var $body = $(e.target).find('[name=body]').val(),
		commentProperties = {
			body: $(e.target).find('[name=body]').val()
		};	
		
		Comments.update(currentCommentId, {$set: commentProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				//console.log("about to route");
				//console.log(this.postId);
				Router.go('postsList');
			}
		});
		//return commentProperties.body;
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this comment?")) {
			currentCommentId = Session.get('currentCommentId');
			curcomment = Session.get('currentPost');
			//var postID = this.PostId;
			//console.log("about to delete");
			Posts.update(curcomment, {$inc: {commentsCount: -1}});
			Comments.remove(currentCommentId);
			//console.log("deleted");
			//console.log(currentCommentId);
			
			Router.go('postsList');
		}
	}
});
