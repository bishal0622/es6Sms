module.exports = function(body){
    
    var anymatch = require('anymatch');

    var matchers = [/\b(BI|bi|Bi)$/, /\b(Pay|pay)[ \t][0-9]{2,6}[\t][a-z]|[1-9]|[A-Z]|[-]|[_]|[.]$/];
    return anymatch(matchers, body, true);
}

