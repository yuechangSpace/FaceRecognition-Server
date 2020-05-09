const Clarifai = require('clarifai') 

const app = new Clarifai.App({
 apiKey: 'd6eea73651224ec8b4892e677d7a4f52'
});

const handleImage = (req,res)=>{
	
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.uri)
	        .then(response => {
	        	console.log("response: "+response)
	        	res.status(200).json(response)
	        })
	        .catch(err => {
	          console.log(err);
	          res.status(400).json("erro!!!!!!!!")
	        });
}

module.exports = {
	handleImage:handleImage
}