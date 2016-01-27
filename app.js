var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/produtos', function(request, response){
	console.log("atendendo a requisição");
	response.render("produtos/lista");
	console.log("listando...");
});

app.listen(3000, function(){
	console.log("servidor rodando.")
});