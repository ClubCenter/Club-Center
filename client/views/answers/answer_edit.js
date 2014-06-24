Template.answerEdit.helpers({
	answer: function() {
		console.log(this._id);
		return Answers.findOne(this._id);
	},
	originalText: function() {
		return Answers.findOne(this._id).body;
	}
});

Template.answerEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		currentAnswerId = Session.get('currentAnswerId');

		//console.log(currentCommentId)
		//var $body = $(e.target).find('[name=body]').val(),
		answerProperties = {
			body: $(e.target).find('[name=body]').val()
		};	
		
		Answers.update(currentAnswerId, {$set: answerProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				//console.log("about to route");
				//console.log(this.postId);
				Router.go('questionsList');
			}
		});
		//return commentProperties.body;
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this answer?")) {
			currentAnswerId = Session.get('currentAnswerId');
			curquestion = Session.get('currentQuestion');
			//var postID = this.PostId;
			//console.log("about to delete");
			Questions.update(curquestion, {$inc: {answersCount: -1}});
			
			Answers.remove(currentAnswerId);
			//console.log("deleted");
			//console.log(currentCommentId);
			
			Router.go('questionsList');
		}
	}
});
