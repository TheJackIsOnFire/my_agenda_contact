import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import ContactValid from './modules/Contacts';

//Validando cadastro de usuário e login
const register = new Login('.form-register');
const login = new Login('.form-login');
login.init();
register.init();

//Validando cadastros de contatos
const registerContact = new ContactValid('.contact-register');
registerContact.init();

//import "./assets/css/style.css";
