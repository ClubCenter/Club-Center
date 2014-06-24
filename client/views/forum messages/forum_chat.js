Template.chats.helpers({
showMessages: function () {
	 
 // console.log(elem);
 //Session.set('a', Session.get('a')+1);
 console.log("shown");
 var a = Session.get('forumNumber');
 console.log(a);
 var b = Messages.find({forumNum: 1}).count();
 console.log(b);
 console.log(Messages.find().count());
  return Messages.find({forumId: Session.get('currentForum')});
}

});
	
	

Template.chats.rendered = function () {
//Session.set('a', 1);
console.log("render");
	var elem = document.getElementById('list');
  elem.scrollTop = elem.scrollHeight;
 // console.log(Session.get('a')); //console logs 1

  
};

