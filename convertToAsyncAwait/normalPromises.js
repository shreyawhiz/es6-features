```javascript
exports.doesUserFollow = function(req, res) {
	// console.log('doesUserFollow');
	exports.fixFollowState(req.profile, req.user)
		.then(function(response){
			res.status(200).json({
				"_id": req.profile.id,
				"follow": response
			});
		})
		.catch(function(err){
			return res.status(400).send({
				message: err
			});
		});
};

exports.fixFollowState = function(user, follower){
	return new Promise(function(resolve, reject){
		if(!follower)
			resolve(0);
		if(!follower.more)
			follower.more = {};
		var findFollowQuery = {follower: follower, user: user};
		followDAL.findOne(findFollowQuery, null)
			.then(function(response){
				follower.more.follow = response ? 1 : 0;
				resolve(follower.more.follow);
			})
			.catch(function(err){
				console.error("error | doesUserFollow | findUserRelation", err);
				reject(err);
			});
	});
};
```
