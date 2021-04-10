const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas', {
	corpo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	perguntaId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

Resposta.sync({force: false}); // Sincriniza a tabela com o banco. O force false é para não recriar a tabela caso exista

module.exports = Resposta;