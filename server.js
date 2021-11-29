const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const {QuoteModel} = require('./models/userModel');
const port = 8000;
const bodyParser = require('body-parser');
const flash=require('express-flash');
const session = require('express-session');
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
mongoose.connect('mongodb://localhost/quoting_dojo');
app.set('views'+__dirname+ '/views');

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('welcome');
  });

app.post('/quotes',function(request,response){
    const name=request.body.name;
    const quote=request.body.quote;
    const newQuote={
        name,
        quote
    };
    QuoteModel
        .createModel(newQuote)
        .then(result=>{
            console.log(result);
            response.redirect('/Quotes');
        })
        .catch(error=>{
            request.flash('quote',"Name and Quote must be greater than 5 characters");
            response.redirect('/');
        });

});


app.get('/Quotes', function(request, response) {
    QuoteModel
        .findQuote()
        .then(data=>{
            response.render('quotes',{quotes:data});
        });
});

app.listen(port);