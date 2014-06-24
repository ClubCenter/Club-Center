Template.forumTabs.helpers({
	forums: function(){
		return Forums.find();

	},
	forumCount: function(){
		return Forums.find().count();
	},
	admin: function(){
		var admin = Meteor.userId() === "P8vfMinRLepQMHTFA";
		//console.log(Meteor.userId());
		return admin;
	}
	
});

Template.forumTab.helpers({
	forumPath: function() {
		console.log(this._id);
		return Router.routes.forumBoard.path({_id: this._id});

	},
	admin: function(){
		var admin = Meteor.userId() === "P8vfMinRLepQMHTFA";
		//console.log(Meteor.userId());
		return admin;
	}
	
});

Template.forumTab.events({
  'click .del-forum': function(e, t) {
   //console.log(Meteor.users.findOne( Meteor.userId()));
   console.log(Forums.findOne(this._id));
    if(confirm("Delete this Forum?") )
    {
    Router.go('postsList');	
    return Forums.remove({
      _id: this._id
    });


  }
  }
});

