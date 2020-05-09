const handleProfile = (req,res,db) =>{
	const { id } = req.params;
	const found = false;
	db.select('name','entries')
	.from('users')
	.where(
		{
			'id':id
		})
	.then(user=>res.json(user))
	// .then(users=>{
	// 	if(users[0]){
	// 		res.status(200).json(`id ${id} is found!`)
	// 	}else{
	// 		res.status(400).json(`Not found!`)	
	// 	}
	// })
	.catch(error => res.json("Failed to fetch the profile"))
}

module.exports={
	handleProfile:handleProfile
}