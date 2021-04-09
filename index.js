const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Definindo o motor de HTML como EJS
app.use(express.static('public')); // Definindo pastas de arquivos estatícos
app.use(express.urlencoded({extended: true})); // Ativando o body-parser
app.use(express.json()); // Ativando leitura de dados em JSON

app.get('/', (req, res) => {
	res.render('index'); // Renderizando minha view
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
	let title = req.body.titulo;
	let description = req.body.descricao;

	res.send(`Título: ${title} / Descrição: ${description}`);
});

app.listen(8080, () => {
	console.log('Servidor iniciado...');
});