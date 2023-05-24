const mongoose = require('mongoose');

const product = mongoose.model('product',{
     NameofProduct : String,
    expirationdate : String,
    value : Number,
    registrationdate : String,
    status : String


})

module.exports = product

    

