var express  = require('express');
var app = express();
var bodyParser 	= require('body-parser');
var getRecaudo = require('./Controllers/GetRecaudo');

var port = '3000'

  app.use(bodyParser.json());
  app.post('/payments/bill', getRecaudo.GetRecaudo);
  app.listen(port,()=> {
    console.log('Servicio expuesto en puerto: ' + port);
  });