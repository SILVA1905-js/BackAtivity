const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const app = express();

app.use(
    express.urlencoded({
        extended: true,

    })
)
app.use( express.json());

app.post('/product', async (req,res) =>{
    const {NameofProduct, expirationdate, value, registrationdate, status}
    = req.body;

    if (!NameofProduct) {
res.status(422).json({error : 'O nome é obrigatorio!'});
  
}
 if (!expirationdate) {
res.status(422).json({error: 'Data de expiração é obrigatoria!'});

    }
    if (!value) {
        res.status(422).json({error : 'O Valor é obrigatorio!'})
        
    
    }
    if (!registrationdate) {
res.status(422).json({error : 'A Data de Registro é obrigatoria!'})  ;          

}
    if(!status) {
res.status(422).json({error : 'Status é Obrigatorio!'});
 
}
    
    const product = {
        NameofProduct, expirationdate, value, registrationdate, status
    }

    try {await Product.create(product);

        res.status(201).json({message : 'Produto Cadastrado com sucesso'});
    

} catch (error) {
    res.status (500).json ({error : error})
}
 
});

app.get('/product', async (req, res) => {
    try {
        const Produto = await Product.find();
        res.status(200).json(Produto);
    } catch (error) {
        res.status(500).json({ error: error });

    }

});





app.patch('/product/:id', async (req, res) => {
const id = req.params.id;
const { NameofProduct, expirationdate, value, registrationdate, status
} = req.body;
const product = {
    NameofProduct,
     expirationdate,
      value,
       registrationdate,
       status
}

try {
const updateProduct = Product.updateOne({ _id:id}, product);
if(updateProduct.matchedcount === 0) {
    res.status(422).json({message : 'Produto inexistente'})
    return;
} 
res.status(200).json(product);
}catch (error) {
    res.status(500).json({error : error})
}
});






app.delete('/person/:id', async(req, res) => {
    const id = req.params.id;


try {
    const product = await Product.findOne({ _id: id});
    if (!product){
        res.status(422).json({message    : "erro, não encontrei nenhum produto"});
        return;
    }
    await product.deleteOne({_id : id});
    res.status(200).json({message : "Produto deletado"});
} catch (error) {
    res.status(500).json({error:error});
}
})








const DB_USER = 'alessandro19005';
const DB_PASS = encodeURIComponent('uJ6PY6pKna57GCAJ');

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@backatividade.co4msfg.mongodb.net/?retryWrites=true&w=majority`
)

.then(() => {
console.log ('Mongodb foi conectado:)')  
  
}).catch((err) => console.log(err));
app.listen(2000)
