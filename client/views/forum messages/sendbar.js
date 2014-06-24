Template.sendbar.events({
  'click button': function () {
    if(Meteor.user())
    {
      var result = ' ';
      var user = Meteor.user().username;
      var msg = $('#msg').val();
      var forumPost=
      {
        forumId: Session.get('currentForum'),
        text: msg,
        name: user,
        date: Date.now()
      }
      if(msg!='')
      {
        Meteor.call('forumPost', forumPost, function(error, result){
          if(error)
          {
            console.log("error");
            throwError(error.reason);
          }
          else
          {
            console.log("Success");
            var elem = document.getElementById("list");
            console.log(elem);
            elem.scrollTop = elem.scrollHeight;
          //  var a = Session.get('forumNumber');
            console.log(a);
            console.log(Messages.find().count());
           // $msg.val(result);
          }

        });
        //Messages.insert({name : user, text : msg, date : Date.now()});
      }
      $('#msg').val("");
    }
    else
      alert("Please Sign In");
  },

  'keypress input': function (evt, template) {
    if (evt.which === 13) {
       if(Meteor.user())
    {
      var forumId = this._id;
      var user = Meteor.user().username;
      var msg = $('#msg').val();
      if(msg!='')
      {
        Meteor.call('forumPost', forumPost, function(error){
          if(error)
          {
            throwError(error.reason);
          }
          else
          {
            console.log("Success");
            var elem = document.getElementById("list");
            console.log(elem);
            elem.scrollTop = elem.scrollHeight;
            var a = Session.get('forumNumber');
 console.log(a);
            var b = Messages.find({forumNum: 1}).count();
 console.log(b);
 console.log(Messages.find().count());
           // $msg.val('');
          }

        });
      }
       // Messages.insert({name : user, text : msg, date : Date.now()});
      $('#msg').val("");
    }
    else
      alert("Please Sign In");
    }
  }

});

