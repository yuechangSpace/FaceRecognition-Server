const express = require('express')
const bodyParser = require("body-parser")


const app = express();
app.listen(3001);
app.use(bodyParser.json());

const userDB={
	users:[
	{
		id:123,
		name:"pan",
		email:"pan@g.com",
		passwd:"panpp",
		entries:0
	},
	{
		id:124,
		name:"li",
		email:"li@g.com",
		passwd:"lixiaojia",
		entries:0

	},
	{
		id:125,
		name:"wang",
		email:"wang@g.com",
		passwd:"wang",
		entries:0

	},
	]
}

//PUT rank entries

//if user EMAIL exist, return TRUE
const userExist = (email)=>{
	for (let i = 0; i < userDB.users.length; i++){
		if (userDB.users[i].email === email) {
			console.log("exist")
			//return user index
			return i;

		}
	}
	console.log("does not exist")
	return -1;
}

app.get('/', (req,res)=>{
	res.send(userDB.users)
})

app.post('/register',(req,res) =>{
	const name = req.body.name;
	const email = req.body.email;
	const passwd = req.body.passwd;
	//if user not exist, then add it or return error
	if (!userExist(email)){
		 userDB.users.push({
		 	id:userDB.users[userDB.users.length - 1].id + 1,
		 	name:name,
		 	email:email,
		 	passwd:passwd,
		 	entries:0
		 })
		 res.status(200).send("registered successfully!"+req.body)
	}else{
		res.status(200).send("email exist!")
	}
	
})

app.post('/signin',(req,res) =>{
	const email = req.body.email;
	const passwd = req.body.passwd;
	const index = userExist(email);
	//if user exist, passwd matches
	if (index !== -1 && userDB.users[index].passwd === passwd){
		res.status(200).send("sigin successfully!")
	}else{
		res.status(200).send("User does not exist or wrong password!")
	}
})

// app.put('/img',(req,res)=>{
	
// })