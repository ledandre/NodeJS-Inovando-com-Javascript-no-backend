module.exports = function(app) {
	app.get('/produtos', function(request, response){
		var connection = app.infra.connectionFactory();

		var produtosDao = new app.infra.ProdutosDAO(connection);

		produtosDao.lista(function(err, results){
			response.render('produtos/lista', {lista: results});
		});

		connection.end();
	});
}