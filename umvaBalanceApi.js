var umvaResponse;

module.exports = function(from){

    var Client = require('node-rest-client').Client;

    var umvaToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVtdmEi.6FKdx5OPZ8knwOeMUTjT-M2j-zG0OD8ntRnpvXXr0VA";

    var client = new Client();

    var phoneNumberOnly = from.substring(1);

    client.get("http://business.capaz.org/sms_balanceEnquiry?&mobile=%2B" + phoneNumberOnly + "&token=" + umvaToken, function (data, response) {
        console.log(JSON.parse(data));
        umvaResponse = JSON.parse(data);

    });

    console.log("umva res:::::",umvaResponse);

    return umvaResponse;
}
