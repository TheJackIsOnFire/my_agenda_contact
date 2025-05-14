import validator from 'validator';

export default class ContactValid {
	constructor(formClass) {
		this.form = document.querySelector(formClass);
	}

	init() {
		this.events();
	}

	events() {
		if (!this.form) return;
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.validate(e);
		});
	}

	validate(e) {
		const el = e.target;
		const nameInput = el.querySelector('input[name="name"]');
		const emailInput = el.querySelector('input[name="email"]');
		const telephoneInput = el.querySelector('input[name="telephone"]');

		const errors = false;

		if (!nameInput.value) {
			alert('O campo nome é obrigatório.');
			return (errors = true);
		}

		if (!emailInput.value && !telephoneInput.value) {
			alert('Pelo menos um dos campos devem ser preenchidos: email, telefone');
			return (errors = true);
		}

		if (!validator.isEmail(emailInput.value)) {
			alert('O email inserido é inválido.');
			return (errors = true);
		}

		if (!errors) el.submit();

		console.log(nameInput.value, emailInput.value, telephoneInput.value);
	}
}
