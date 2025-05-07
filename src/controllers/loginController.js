const Login = require('../models/LoginModel');

exports.index = (req, res) => {
	console.log(req.session.user);
	if (req.session.user) return res.render('loggedInUser');
	res.render('login');
};

exports.register = async (req, res) => {
	try {
		const login = new Login(req.body);
		await login.registerUser();

		if (login.errors.length > 0) {
			req.flash('messagesErrors', login.errors);
			req.session.save(() => {
				console.log(`Mensagem de error -> ${login.errors}`);
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

exports.login = async (req, res) => {
	try {
		const login = new Login(req.body);
		await login.loginUser();

		if (login.errors.length > 0) {
			req.flash('messagesErrors', login.errors);
			req.session.save(() => {
				console.log(`Mensagem de error -> ${login.errors}`);
				return res.redirect('../login');
			});
			return;
		}

		req.flash('messagesSuccess', 'Você esta logado.');
		req.session.user = login.user;
		req.session.save(() => {
			console.log(`Usuário logado: ${login.user}`);
			return res.redirect('../login');
		});
	} catch (e) {
		console.log(e);
		return res.render('404');
	}
};

exports.logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
};
