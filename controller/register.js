const handleRegister = (req,res,db) =>{
	const name = req.body.name;
	const email = req.body.email;
	const passwd = req.body.passwd;
	if (! name| ! email| ! passwd) return res.status(400).json("Should not be empty")
	db('users')
		.returning('*')
		.insert({
		 	name:name,
		 	email:email,
		 	passwd:passwd.toString(),
		 	entries:0,
		 	joined:new Date()
	})
	.then(user=>res.json(user))
	.catch(error=>{
		console.log("Oooops "+error)
		res.status(400).json("Oooops, it is  an exisiting email!")
	})

}

module.exports = {
	handleRegister:handleRegister
}