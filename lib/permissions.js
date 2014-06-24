ownsDocument = function(userId, doc) {
	var owner = (doc && doc.userId === userId);
	 return true;
	
	
}

isOwner = function(userId, doc){
	return (doc && doc.userId === userId);
}