import express from 'express';
import bodyParser from 'body-parser'
import twilio from 'twilio';
import http from 'http';
import {checkBodySyntax} from "./checkBodySyntax";
import {umvaBalanceApi} from "./umvaBalanceApi";
import {umvaTransferApi} from "./umvaTransferApi";
import {sendTwilioSms} from "./sendTwilioSms";

export function provider() {
    var app = new express();

    app.use(bodyParser.urlencoded({extended: false}));

    //Twilio SMS GAteway
    app.post('/smsTwilio', function (req, res) {
        var twiml = new twilio.TwimlResponse();

        console.log(req.body);

        var splittingBody = req.body.Body.split(' ');

        var from = req.body.From;

        var index = checkBodySyntax(req.body.Body);


        if (index == 0) {
            console.log('balance inquiry');
            var umvaResponse = umvaBalanceApi(from);
            if (umvaResponse.error == 404){
                console.log("*** Error Message BI ***");
                sendTwilioSms("The number is not registered. Please contact your Bank.", from);
            }else if(umvaResponse.success){
                console.log("*** Success Message BI ***");
                sendTwilioSms("mobile: " + umvaResponse.success.mobile + "\n Currency: " + umvaResponse.success.currency + "\n Balance: " + umvaResponse.success.balance, from);
            }

        } else if (index == 1) {
            console.log('Transfer');
            console.log("Amount : " + splittingBody[1]);
            console.log("Username " + splittingBody[2]);
            var amount = splittingBody[1];
            var username = splittingBody[2];
            var umvaResponse = umvaTransferApi(from, amount, username);
            if(umvaResponse.error == 400){
                console.log("*** Error Message PAY ***");
                sendTwilioSms("The username is not registered. Please contact your Bank.", from);
            }else  if(umvaResponse.success){
                console.log("*** Success Message PAY ***");
                sendTwilioSms(data.success.senderMessage , from);
                if(umvaResponse.success.receiverMobile != null){
                    sendTwilioSms(data.success.receiverMessage,data.success.receiverMobile);
                }
            }
        }
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });

    //next Gateway


    http.createServer(app).listen(process.env.PORT, function () {
        // console.log("Express server listening on port 1337");
    });

}