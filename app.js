var express = require("express"); // 1 Chamando o pacote do express
var mongoose = require("mongoose"); // 6 chamando o banco de dados

const app = express(); //2 app guarda o objeto do express
const port = 3000; //5 informa a porta 

mongoose.connect("mongodb+srv://natali_lucas:natali_lucas@cluster0.pk7gr.mongodb.net/vendas?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true}) //7 conectando o banco de dados, use... evita a depreciação do mongoose, são chamadas de flag e agem igual ao meta do html

//8 - definindo as categorias do meu banco (collection), primeiro defino o nome da const e depois informo o mongoose.model e informo o nome que dei no meu banco de dados do Atlas(moongodb)
const Produtos = mongoose.model("Produtos", {
    nome: String,
    vlUnit: Number,
    codigoBarras: String,
});


app.set("view engine", "ejs"); //10 - setando o motor de visualização EJS que foi instalado anterioremente.
app.set("views", __dirname , "/views"); //11 setando os meios de visualização, ainda não foi finalizado.
app.use(express.urlencoded());//12 linhas de comandos que permite que os dados trafeguem de uma pagina a outra, permite o fluxo
app.use(express.json()); //13 e 12 permitindo que os arquivos passem de uma pag a outra em modo de json que é mais leve




app.get("/", (req, res) => { //3 esse pega o objeto e envia uma resposta (req não está sendo utilizada) e envia a msg para a pasta principal, cria a rota para a raiz -> "/"
    res.send("Página inicial");

});

app.get("/produtos", (req, res)=>{ //9 - (criando rota para listas os produtos cadastrados) reendirecionar a rota para a aba de produtos, oq ainda não foi criado a pagina de produtos.
    let consulta = Produtos.find({}, (err, produto)=>{ // 16 - configurando para encontrar e retornar para a listagem
        console.log(consulta);
        if(err)
            return res.status(500).send("Erro ao consultar produto")
        res.render("produtos", {produtos_itens:produto});
    }) // pega a const Produts e traz os dados com o find
    
});

//rota para reenderizar a pagina de formulario de cadastro
app.get("/cadastrarProdutos", (req, res)=>{
    res.render("formprodutos")
})

//metodo post para salvar os produtos no banco, através do name.
app.post("/cadastrarProdutos" , (req, res)=>{ //15 - método informado no formulario que servirá para guardar o formulario enviado 
    let produto = new Produtos(); // criando um objeto do tipo Produtos que vem do const Produtos module.

    produto.nome = req.body.nome; // utilizando a requisicao para pegar os dados do ejs(html) com o name definido e inserido na const Produtos.
    produto.vlUnit = req.body.valor; // o body informado não é do html e sim da requisição
    produto.codigoBarras = req.body.codBarras;
    
    
    produto.save((err) =>{
        if(err)
            return res.status(500).send("Erro ao cadastrar produto") // 500 erro do servidor
        res.redirect("/produtos");

    })
})

app.get("/deletarProduto/:id", (req,res)=>{ //17 - Rota para excluir depois de ter inserido na tabela os btn de deletar
    var chave = req.params.id;

    Produtos.deleteOne({_id:chave}, (err, result)=>{ //1º id vem do banco de dados
        if(err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/produtos")
    });
});

app.get("/editarProduto/:id", (req,res)=>{
    var id = req.params.id;
	Produtos.findById(id, (err, produto)=>{
		if(err)
			return res.status(500).send("Erro ao consultar produto");
		res.render("formEditarproduto",{produto_item:produto})
	});
});

app.post("/editarProduto", (req,res)=>{
	var id = req.body.id;
	Produtos.findById(id,(err, produto)=>{
		if(err)
			return res.status(500).send("Erro ao consultar produto");
		produto.nome = req.body.nome;
		produto.vlUnit = req.body.valor;
		produto.codigoBarras = req.body.codBarras;

		produto.save(err =>{
			if(err)
				return res.status(500).send("Erro ao editar produto");
			return res.redirect("/produtos");
			
		});
	});
});




//definindo a porta que irei acessar a minha aplicacao
app.listen(port, ()=> {
    console.log("Servidor rodando na porta " + port); //4ele faz a escuta e seleciona a porta para enviar o meu conteudo.
});




