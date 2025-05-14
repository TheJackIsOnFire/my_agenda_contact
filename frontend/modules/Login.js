import validator from 'validator';

export default class Login {
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
		const emailInput = el.querySelector('input[name="email"]');
		const passwordInput = el.querySelector('input[name="password"]');

		const errors = false;

		if (!validator.isEmail(emailInput.value)) {
			alert('O email inserido é inválido.');
			return (errors = true);
		}

		if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
			alert('A senha precisa ter entre 3 a 50 caractere.');
			return (errors = true);
		}

		if (!errors) el.submit();

		console.log(emailInput.value, passwordInput.value);
	}
}
