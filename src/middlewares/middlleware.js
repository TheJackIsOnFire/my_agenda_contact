exports.checkCrsfError = (err, req, res, next) => {
	if (err) {
		return res.render('404');
	}

	next();
};

exports.csrfMiddleware = (req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};

exports.middlewareMessages = (req, res, next) => {
	res.locals.msgErrors = req.flash('messagesErrors');
	res.locals.msgSuccess = req.flash('messagesSuccess');
	next();
};

exports.middlewareSession = (req, res, next) => {
	res.locals.user = req.session.user;
	next();
};

exports.loginRequired = (req, res, next) => {
	if (!req.session.user) {
		req.flash('messagesErrors', 'Voce precisa estar logado para cadastrar contatos.');
		req.session.save(() => res.redirect('/'));
		return;
	}
	next();
};
