
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');


if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//import stripe library after requre('dotenv');
//we do this bc we're importing the secret key from .env

//returns stripe object that will allow us to make charges
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
 
if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html')) 
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server Running on port ' + port);
}) 

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
})


//req holds info of request — includes all the info we're sending with the request
//res holds info of response 
app.post('/payment', (req, res) => {
    
    const body =  {  
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr })
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })
})