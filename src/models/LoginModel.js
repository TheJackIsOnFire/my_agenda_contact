const mongoose = require('mongoose');
const validator = require('validator');

// Define um novo schema (estrutura) para o modelo de login usando Mongoose
const LoginSchema = new mongoose.Schema({
	// Campo "email": do tipo String e obrigatório
	email: { type: String, required: true },

	// Campo "password": do tipo String e obrigatório
	password: { type: String, required: true },
});

// Cria o modelo "Login" com base no schema definido acima
// Esse modelo será usado para interagir com a coleção "logins" no MongoDB
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
	constructor(body) {
		this.body = body;
		this.errors = [];
		this.user = null;
	}

	//Registra o usuário na base de dados o após as validações
	//Quando trabalhamos com a base de dados usamos funções assincronas
	//A função sempre retorna uma promisse
	async registerUser() {
		//Chama a função que faz a validação
		this.isValid();

		//Trava o código se tiver erros no array de this.errors
		if (this.errors.length > 0) return;

		try {
			//Cria o objeto na base de dados
			//O objeto pode ser acessado pelo this.user (fora da função)
			this.user = await LoginModel.create(this.body);
		} catch (e) {
			console.log(e);
		}
	}

	//Realiza validações
	isValid() {
		this.cleanUp();

		//Validando email usando o validator
		if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

		//Validando a senha
		//A senha precisa ter entre 3 a 50 caracteres
		if (this.body.password.length < 3 || this.body.password.length > 50) {
			this.errors.push('Senha invalida: a senha precisa ter entre 3 a 50 caracteres.');
		}
	}

	//Limpa os campos que não são strings
	//Configura a estrutura do objeto
	//Salva apenas os campos
	cleanUp() {
		for (const key in this.body) {
			if (typeof this.body[key] !== 'string') {
				this.body[key] = '';
			}

			this.body = {
				email: this.body.email,
				password: this.body.password,
			};
		}
	}
}

module.exports = Login;
