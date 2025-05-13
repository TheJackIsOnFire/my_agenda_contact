const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
	res.render('contact', { contactDb: {} });
};

exports.register = async (req, res) => {
	try {
		const newContact = new Contact(req.body);
		await newContact.registerContact();

		if (newContact.errors.length > 0) {
			req.flash('messagesErrors', newContact.errors);
			req.session.save(() => {
				res.redirect('../contact');
				return;
			});
			return;
		}

		req.flash('messagesSuccess', 'O contato foi registrato com sucesso.');
		req.session.save(() => {
			res.redirect(`/contact/${newContact.contact._id}`);
			return;
		});
	} catch (e) {
		console.log(e);
		res.render('404');
	}
};

exports.idContact = async (req, res) => {
	if (!req.params.id) return res.render('404');

	const contactDb = await Contact.searchId(req.params.id);

	if (!contactDb) return res.render('404');

	res.render('contact', { contactDb });
};

exports.editContact = async (req, res) => {
	try {
		if (!req.params.id) return res.render('404');

		const newContactEdit = new Contact(req.body);

		await newContactEdit.editContact(req.params.id);

		if (newContactEdit.errors.length > 0) {
			req.flash('messagesErrors', newContactEdit.errors);
			req.session.save(() => {
				res.redirect(`../${req.params.id}`);
				return;
			});
			return;
		}

		req.flash('messagesSuccess', 'O contato foi editado com sucesso.');
		req.session.save(() => {
			res.redirect(`/contact/${newContactEdit.contact._id}`);
			return;
		});
	} catch (e) {
		console.log(e);
		res.render('404');
	}
};
