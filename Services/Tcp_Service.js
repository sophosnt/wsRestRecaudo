var net = require('net');
var port = 9881;
var host = '192.168.99.100';



var TCPM = function TCPM(){};

TCPM.prototype.init = (body, valor)=>{
 var queue = 
 body.id_trn+
 '00'+body.account_type+body.account_type_to+
 body.ammount+
 body.date.substring(5,7)+body.date.substring(8,10)+
 body.date.substring(11,13)+body.date.substring(14,16)+body.date.substring(17,19)+
 body.card_id+
 body.currency+
 body.pin+
 body.account_id+
 body.account_id_to;
    var client = null;
    client = new net.Socket();
    client.connect({port: port, host: host }, ()=>{
        console.log('Conexión TCP establecida.');
        client.write(queue);
        });
    client.on('data', (data) => {          
        valor(data.toString());
        client.end();   
          });
    client.on('end', () => {
            client.destroy();
            console.log('Desconectado');
          });
}; 
module.exports = new TCPM();

 