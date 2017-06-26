module.exports = function(from,amount,username){

    var Client = require('node-rest-client').Client;

    var umvaToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVtdmEi.6FKdx5OPZ8knwOeMUTjT-M2j-zG0OD8ntRnpvXXr0VA";

    var client = new Client();

    var phoneNumberOnly = from.substring(1);

    var umvaResponse;

    client.get("http://business.capaz.org/sms_balanceTransfer?mobile=%2B" + s +"&amount=" + amount +"&receiver=" + username + "&token=" + token, function(data, response) {
        console.log(JSON.parse(data));
        umvaResponse = JSON.parse(data);
    });

    return umvaResponse;

}

