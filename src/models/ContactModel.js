const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: false, default: '' },
	email: { type: String, required: false, default: '' },
	telephone: { type: String, required: false, default: '' },
	createdIn: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
	constructor(body) {
		this.body = body;
		this.errors = [];
		this.contact = null;
	}

	async editContact(id) {
		if (typeof id !== 'string') return;

		this.isValid();

		if (this.errors.length > 0) return;

		this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
	}

	//Valida os dados e envia para o banco de dados do mongoose
	async registerContact() {
		this.isValid();

		//Verifica existem mensagens de erros no array de errors
		if (this.errors.length > 0) return;

		//Envia os dados para o BD
		this.contact = await ContactModel.create(this.body);
	}

	//Realiza validações
	isValid() {
		this.cleanUp();

		//Validando campo name
		if (!this.body.name) this.errors.push('Nome é um campo obrigatório.');

		//Validando email usando o validator
		if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

		//Garantindo que pelo menos um campo, email ou telefone deve ser preenchido
		if (!this.body.email && !this.body.telephone)
			this.errors.push('Pelo menos um campo deve ser preenchido: e-mail ou telefone.');
	}

	//Limpa os campos que não são strings
	//Configura a estrutura do objeto
	//Salva apenas os campos
	cleanUp() {
		for (const key in this.body) {
			if (typeof this.body[key] !== 'string') {
				this.body[key] = '';
			}

			//Cria um objeto com dados filtrados
			this.body = {
				name: this.body.name,
				lastName: this.body.lastName,
				email: this.body.email,
				telephone: this.body.telephone,
			};
		}
	}

	//Métodos estáticos
	static async searchId(id) {
		if (typeof id !== 'string') return;
		const contactId = await ContactModel.findById(id);
		return contactId;
	}

	//Busca os contatos no banco de dados e os ordena pela data e criação
	static async searchContacts() {
		const contacts = await ContactModel.find().sort({ createdIn: -1 });
		return contacts;
	}

	static async deleteContact(id) {
		if (typeof id !== 'string') return;
		const contactDelete = await ContactModel.findOneAndDelete({ _id: id });
		return contactDelete;
	}
}

module.exports = Contact;
