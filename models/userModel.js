const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength:5
    },
    quote:{
        type:String,
        minlength:5
    }
  });

const Quote = mongoose.model('quotes', quoteSchema);

const QuoteModel={
    createModel:function(newQuote){
        return Quote.create(newQuote);
    },
    findQuote:function(){
        return Quote.find();
    }
}


module.exports={QuoteModel};