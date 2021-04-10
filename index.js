const express = require('express');
const app = express();
const connection = require('./database/database'); // Importando conexão com o banco
const Pergunta = require('./database/Pergunta'); // Importando meu Model
const Resposta = require('./database/Resposta');

connection
	.authenticate()
	.then(()=>{
		console.log('Conexão realizada com sucesso');
	})
	.catch((error)=>{
		console.log(error);
	}); // Realizando conexão com o banco

app.set('view engine', 'ejs'); // Definindo o motor de HTML como EJS
app.use(express.static('public')); // Definindo pastas de arquivos estatícos
app.use(express.urlencoded({extended: true})); // Ativando o body-parser
app.use(express.json()); // Ativando leitura de dados em JSON

app.get('/', (req, res) => {
	Pergunta.findAll({raw: true, order: [
		['id', 'DESC'] // Realizando ordenação
	]}).then((perguntas)=>{ // Incluir o raw = true para não trazer outras informações do banco e trazer somente os dados
		res.render('index', {perguntas}); // Renderizando minha view
	}) // Buscando todos os registros da tabela
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
	let title = req.body.titulo;
	let description = req.body.descricao;

	Pergunta.create({
		titulo: title,
		descricao: description
	}).then(()=>{
		res.redirect('/'); // Salvando os dados na tabela e redirecionando o usuário
	});
});

app.get('/pergunta/:id', (req, res) => {
	let id = req.params.id;
	Pergunta.findOne({
		where: {id: id}
	}).then(pergunta => {
		if(pergunta != undefined) {
			Resposta.findAll({
				where: {perguntaId: pergunta.id},
				order:[['id', 'DESC']]
			}).then(respostas => {
				res.render('pergunta', {pergunta, respostas});
			});
		} else {
			res.redirect('/');
		}
	})
});

app.post('/responder', (req, res) => {
	let corpo = req.body.corpo;
	let perguntaId = req.body.pergunta;

	Resposta.create({
		corpo, perguntaId
	}).then(()=>{
		res.redirect(`/pergunta/${perguntaId}`);
	})
});

app.listen(8080, () => {
	console.log('Servidor iniciado...');
});