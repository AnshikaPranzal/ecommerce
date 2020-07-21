

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "527rzpzjbsg87b9t",
  publicKey: "vkd2w2py3dh86cm6",
  privateKey: "b7b65632b4577e8a746fe2848e859f92"
});


exports.getToken=(req,res)=>{
    gateway.clientToken.generate({},function(err, response) {
        if (err) {
          res.status(500).json(err);
        } else {
            
          res.send(response);
        }
      });
    };
exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce;
    let amountFromTheClient=req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if(err ){
            return res.status(500).send(err)
        }
        else
        {
            res.send(result)
        }
      });
}