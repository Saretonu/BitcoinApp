const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post("/", function(req, res){
    let currency = req.body.currency;
    let ammount = req.body.ammount;

    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    
    request(url, function(error, response, body){
        console.log("Server status code ", response.statusCode);
        //console.log(response);

        let data = JSON.parse(response.body);
        let price;
        if(currency === "EUR"){
            price = data.bpi.EUR.rate_float;
            console.log(price);
        }else if(currency === "USD"){
            price = data.bpi.USD.rate_float;
            console.log(price);
        }else if(currency === "XBT"){
            price = data.bpi.XBT.rate_float;
            console.log(price);
        }else{
            price = 0;
            console.log(price);
        }
        let temp = price * ammount;
        //document.getElementById("value").innerHTML = temp;
    });  
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});

/*app.listen(3000, function(){
    console.log("Server has started.");
});*/