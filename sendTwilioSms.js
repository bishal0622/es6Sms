module.exports = function(replyMsg, from) {
    //accountSid of twilio
    var accountSid = 'ACbcb5edc921fac5d729a9e8ca2c29ae9c';

    //Authentication Token of twilio
    var authToken = 'bb217174e9f4c2310bc0c2cb14129542';

    //Account login
    var client = require('twilio')(accountSid, authToken);

    //Message create
    client.messages.create({
        to: from,
        from: "+18642142077",
        body: replyMsg
    }, function(err, message) {
        // console.log(message.sid);
    });
}