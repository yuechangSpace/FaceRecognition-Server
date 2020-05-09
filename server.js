const register = require('./controller/register.js')
const signin = require('./controller/signin.js')
const profile = require('./controller/profile.js')
const image = require('./controller/image.js')
const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const postgres = require("postgres")
const app = express();
const knex = require('knex')


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facerec'
  }
})
//PORT injected from bash
//e.g. PORT=4000 npm start;
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`now running on port: ${PORT}\n`); 
});
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }));
// OR app.use(cors());
app.use((req, res, next)=>{
  // console.log('Limit file size: '+limit);
	res.header("Access-Control-ALlow-Origin","*");
	res.header("Access-Control-Request-Method",'GET, PUT, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization,Content-type");
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.status(200);
      next();
    }
    else {
    //move on
      next();
    }
	})

app.get('/', (req,res)=>{
	db.select('*').from('users')
	.then(users=>res.json(users))
})

app.post('/register',(req,res)=>register.handleRegister(req,res,db))

app.post('/signin',(req,res) =>signin.handleSignin(req,res,db))

app.get('/profile/:id',(req,res) =>profile.handleProfile(req,res,db))

app.post('/image',(req,res) =>image.handleImage(req,res))