module.exports = function(app) {
	app.get('/produtos', function(request, response){
		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.ProdutosDAO(connection);

		produtosDao.lista(function(err, results){
			response.format({
				html: function() {
					response.render('produtos/lista', {lista: results});
				},
				json: function() {
					response.json(results);
				}
			});
		});

		connection.end();
	});

	app.get('/produtos/form', function(request, response) {
		response.render('produtos/form', {errosValidacao:{}, produto:{}});
	});

	app.post('/produtos', function(req, res) {
		var produto = req.body;

		req.assert('titulo', 'Título é obrigatório').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();

		var erros = req.validationErrors();
		if(erros) {
			res.format({
				html: function() {
					res.status(400).render('produtos/form',{errosValidacao:erros, produto:produto});
				},
				json: function() {
					res.status(400).json(erros);
				}
			});

			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.ProdutosDAO(connection);

		produtosDao.salva(produto, function(err, results){
			res.redirect('/produtos');
		});

		connection.end();
	});
}