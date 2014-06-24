Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		console.log($(e.target).find('[name=pin]').val());
		var post = {
			//url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			pinned: $(e.target).find('[name=pin]').val() !== ""
		}
		Meteor.call('post', post, function(error, id) {
			if(error){
				throwError(error.reason);
		}else{
			Router.go('postPage', {_id: id});
		}
		});
		
	}
});


