const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51Lu1r7C4mEPmkwrjTSKJD190VJG2yZOTZ1fLFdbcXbGPlCw1n5IPnaiH08ie7xzKB8Ph9BNnwcN0Fv53JR09imOF00dbVihOhL')
// headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//     "Access-Control-Allow-Origin": "*",
// }

//API

//app config
const app = express()

//middleware
app.use(cors({origin: true}))
app.use(express.json())
app.options('*', cors())

/*Certain CORS requests are considered 'complex' and require an initial OPTIONS request (called the "pre-flight request"). 
  An example of a 'complex' CORS request is one that uses an HTTP verb other than GET/HEAD/POST (such as DELETE) or that uses custom headers. 
  To enable pre-flighting, you must add a new OPTIONS handler for the route you want to support 
  The above enables pre-flight across the board*/
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
  });
  

//api routes
/* app.all('/pay', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("access header modified")
    next()
  }); */


/* app.post("/pay", async (request, response) => {

    console.log('In the /pay Post REQUEST')
    response.send("POST")
    
}) */


app.post("/payments/create", async (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log('In the Post REQUEST')

    const total = request.query.total;

    console.log("Payment Request for this amount >>> ", total);
    //response.send('POST REQUEST OCCURED')

const paymentIntent = await stripe.paymentIntents.create({
amount: total, // subunits of the currency
currency: "usd",
});
console.log("THIS IS THE SECRET >>> ", paymentIntent.client_secret);
// OK - Created
response.status(201).send({
clientSecret: paymentIntent.client_secret})
//response.status(200).send("hello world")
});

app.get("/", (request, response) => {
    response.status(200).send("hello world")});


//listen command
exports.api = functions.https.onRequest(app)

//http://127.0.0.1:5001/clone-816a9/us-central1/api