var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://natali_lucas:natali_lucas@cluster0.pk7gr.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{
    console.log("Banco conectado!")
}).catch((err)=>{
    console.log("Deu ruim!"+ err);
})