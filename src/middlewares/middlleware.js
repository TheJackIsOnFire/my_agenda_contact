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
