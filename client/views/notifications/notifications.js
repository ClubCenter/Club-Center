Template.notifications.helpers({
	notifications: function(){
		return Notifications.find({userId: Meteor.userId(),read: false});

	},
	notificationCount: function(){
		console.log(Meteor.userId());
		console.log(Notifications.find({userId: Meteor.userId(),read: false}).count());
		return Notifications.find({userId: Meteor.userId(),read: false}).count();
	}
});

Template.notification.helpers({
	isComment: function(){
		return this.type === "comment";

	},


	notificationPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});

	},
	notificationQuestionPath: function() {
		return Router.routes.questionPage.path({_id: this.postId});

	}
	
})

Template.notification.events({
	'click a': function(){
		Notifications.update(this._id,{$set: {read: true}});
	}
})