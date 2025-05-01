# Criando um projeto do zero

# Agenda de Contatos

## Crie e configure o ambiente de trabalho

## Dependencias usadas no projeto

    "dependencies": {
        "connect-flash": "^0.1.1",
        "connect-mongo": "^5.1.0",
        "core-js": "^3.40.0",
        "css-loader": "^7.1.2",
        "csurf": "^1.11.0",
        "dotenv": "^16.4.7",
        "ejs": "^3.1.10",
        "express": "^4.21.2",
        "express-session": "^1.18.1",
        "helmet": "^8.0.0",
        "mongoose": "^8.12.1",
        "regenerator-runtime": "^0.14.1",
        "style-loader": "^4.0.0",
    },

    "devDependencies": {
        "@babel/cli": "^7.26.4",
        "@babel/core": "^7.26.9",
        "@babel/preset-env": "^7.26.9",
        "@eslint/css": "^0.7.0",
        "@eslint/js": "^9.25.1",
        "@eslint/json": "^0.12.0",
        "@eslint/markdown": "^6.4.0",
        "babel-loader": "^9.2.1",
        "eslint": "^9.25.1",
        "eslint-config-prettier": "^10.1.2",
        "eslint-plugin-prettier": "^5.2.6",
        "globals": "^16.0.0",
        "nodemon": "^3.1.9",
        "prettier": "^3.5.3",
        "typescript-eslint": "^8.31.1",
        "webpack": "^5.98.0",
        "webpack-cli": "^6.0.1"
    }

## Instale e configure o webpack

## Instale e configure o Express

## Instale e configure eslint e o prettier

## Crie a estrutura do projeto

## Criando a pagina inicial(Home)

    - Crie a pasta views dentro e src e dentro dela crie a pasta includes

    - Crie um arquivo chamado index.ejs
        - Ele será a pagina home do projeto
        - Separe a head e o footer a pagina em outros arquivos com os mesmo nomes e os coloque na pasta includes.
        - Em sequidda os importe na sua home

          <%- include('includes/head')%>

          <%- include('includes/footer')%>

    - Crie a rota para a página em routes.js

        //Rotas da home
        route.get('/', homeController.index);

    - Crie a pasta controler se ainda não tiver criado
    - Dentro da pasta crie o arquivo chamado homeController
    - Crie a requisição para renderizar a página

        exports.index = (req, res) => {
            res.render('index');
            return;
        };

    - Salve o projeto

## Criando a seção de login e registro do usuário
