module.exports = function(app) {
	app.get('/', function(request, response){
		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.ProdutosDAO(connection);

		produtosDao.lista(function(err, results){
			response.render('home/index', {livros: results});
		});

		connection.end();
	});
}