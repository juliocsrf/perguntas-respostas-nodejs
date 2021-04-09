const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Definindo o motor de HTML como EJS
app.use(express.static('public')); // Definindo pastas de arquivos estatícos

app.get('/', (req, res) => {
	res.render('index'); // Renderizando minha view
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
	res.send('Formularío enviado!');
});

app.listen(8080, () => {
	console.log('Servidor iniciado...');
});