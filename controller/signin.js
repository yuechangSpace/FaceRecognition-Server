const handleSignin = (req,res,db) =>{
	const email = req.body.email;
	const passwd = req.body.passwd;
	if (! email| ! passwd) return res.status(400).json("Should not be empty")
	db.select("*")
	.from("users")
	.where({
		'passwd':passwd,
		'email':email
	})
	.then(user=>{
		if (user.length !== 0 && user[0].id){
				db("users")
				.where("id",'=',user[0].id)
				.increment("entries",1)
				.then(console.log)

			 	res.status(200).json(user[0])
		}else{
			res.status(400).json("Oooops, no record founded!")
		}
	})
}

module.exports = {
	handleSignin:handleSignin
}