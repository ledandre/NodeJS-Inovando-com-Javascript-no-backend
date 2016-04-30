var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function(){
	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query("delete from livros", function(exception, result){
			if(!exception) {
				done();
			}
		});
	});

	it('#listagem json', function(done){
		request.get('/produtos')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});