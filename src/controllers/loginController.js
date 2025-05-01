const Login = require('../models/LoginModel');

exports.index = (req, res) => {
	res.render('login');
};

exports.register = async (req, res) => {
	try {
		const login = new Login(req.body);
		await login.registerUser();

		if (login.errors.length > 0) {
			req.flash('messagesErrors', login.errors);
			req.session.save(() => {
				console.log(`Mensagens de errors -> ${login.errors}`);
				return res.redirect('../login');
			});
			return;
		}

		req.flash('messagesSuccess', 'O usuário foi criado com sucesso.');
		req.session.save(() => {
			console.log(`Usuário criado: ${login.user}`);
			return res.redirect('../login');
		});
	} catch (e) {
		console.log(e);
		return res.render('404');
	}
};
