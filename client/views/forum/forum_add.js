Template.forumAdd.events({
	'submit form': function(e) {
		e.preventDefault();
		var post = {
			//url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			
		}
		
		console.log(rename(post.title));
		if(rename(post.title))
		{
			alert("This Forum already exists");
		}else
		{
		Meteor.call('newForum', post, function(error, id) {
			if(error){
				throwError(error.reason);
		}else{
			console.log("New Forum");
			Router.go('forumBoard', {_id: id});
		}
		});
		}
	}
});

rename = function(a)
{
	var count = 0;
	console.log(count);
	var forumNames = Forums.find({}, {});
	 forumNames.forEach(function(forum){
	 	//console.log(forum.title);
	 	if(forum.title === a)
	 	{
	 		console.log("Match");
	 		count++;
	 	}
	 });
	 console.log(count);
	 return count !== 0;
};