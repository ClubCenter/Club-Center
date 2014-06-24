Template.questionSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var question = {
			//url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}
		Meteor.call('question', question, function(error, id) {
			if(error){
				throwError(error.reason);
		}else{
			Router.go('questionPage', {_id: id});
		}
		});
		
	}
});

