let Validator = require('validatorjs');
var tcpm =  require('../Services/Tcp_Service');

var Schreq = {
   "id_trn": 'string|min:4|max:4',
   "account_id": 'string|min:28|max:28',
   "account_type": 'string|min:2|max:2',
   "account_id_to": 'string|min:28|max:28',
   "account_type_to": 'string|min:2|max:2',
   "ammount": 'integer|min:10000|max:999999999999',
   "currency": 'string|min:3|max:3',
   "card_id": 'integer|digits:11',
   "pin": "string|min:8|max:8",
   "date": "date",
   "bill_id": "string",
   "nit_id_to": "string"
 };

exports.GetRecaudo = (req,res)=>{
   let validador = new Validator(req.body , Schreq);

   try{
     parseInt(req.body.account_id);
     parseInt(req.body.account_id_to);
   }catch(error){
    res.status(200).send(error.toString());
   }
   if(validador.passes() ){        
     tcpm.init(req.body,(resultado)=>{
      var respuesta = {
         "id_trn":  resultado.substring(0,4),
         "auth_code": resultado.substring(70,76),
         "account_id": req.body.account_id,
         "account_type": req.body.account_type,
         "account_id_to": req.body.account_id_to,
         "account_type_to": req.body.account_type_to,
         "ammount": req.body.ammount,
         "currency": req.body.currency,
         //"account_bal": resultado.substring(42,54),
         "date": req.body.date,
         "server_date": resultado.substring(54,64),
         "bill_id": req.body.bill_id,
         "nit_id_to": req.body.nit_id_to,
         "status": {
           "status_code": resultado.substring(76,78),
           "status_desc": resultado.substring(89,120),
           "status_info": resultado.substring(36,42),
           "additional_status_code": resultado.substring(80,85),
           "additional_status_desc": resultado.substring(64,70)
         }
      };   
             res.status(200).send(respuesta);
     });
   }else {
     res.send(
       {
         HTTPCODE: '600',
         HTTPMESSAGE: 'Datos Incorrectos',
         MOREINFORMATION: ''});
   }


}