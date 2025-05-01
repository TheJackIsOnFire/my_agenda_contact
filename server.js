// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importações de bibliotecas
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Importações internas (rotas e middlewares personalizados)
const routes = require('./routes');
const { middlewareMessages, checkCrsfError, csrfMiddleware } = require('./src/middlewares/middlleware');

// Inicialização do Express
const app = express();

// Conexão com o banco de dados MongoDB
mongoose
	.connect(process.env.CONNECTIONSTRING)
	.then(() => {
		app.emit('Pronto!'); // Emite evento quando a conexão for bem-sucedida
	})
	.catch(e => {
		console.log('Erro ao conectar no MongoDB:', e);
	});

// Middlewares de parsing (para tratar dados do body da requisição)
app.use(express.urlencoded({ extended: true })); // Suporte a forms
app.use(express.json()); // Suporte a JSON

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.resolve(__dirname, 'public')));

// Middleware de segurança (protege contra algumas vulnerabilidades)
app.use(helmet());

// Configuração de sessão
const sessionOptions = session({
	secret: 'aula_criando_agenda_de_contatos', // Chave secreta da sessão (ideal esconder no .env)
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), // Armazena sessões no MongoDB
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie válido por 7 dias
		httpOnly: true, // Impede acesso ao cookie via JavaScript
	},
});
app.use(sessionOptions);

// Middleware de mensagens temporárias (flash messages)
app.use(flash());

// Configuração da engine de visualização EJS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware de proteção CSRF (evita ataques de falsificação de requisições)
app.use(csrf());

// Middlewares personalizados
app.use(middlewareMessages); // Middleware de mensagens de erro ou sucesso (disponibiliza dados em todas as views)
app.use(checkCrsfError); // Lida com erros CSRF
app.use(csrfMiddleware); // Injeta token CSRF nas views

// Rotas da aplicação
app.use(routes);

// Inicia o servidor após conexão com o banco de dados
app.on('Pronto!', () => {
	app.listen(3000, () => {
		console.log('Acessar http://localhost:3000');
		console.log('Servidor rodando na porta 3000');
	});
});
