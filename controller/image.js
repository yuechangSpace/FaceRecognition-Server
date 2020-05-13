const Clarifai = require('clarifai') 

const app = new Clarifai.App({
 apiKey: process.env.CLRF_API_KEY
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