// Required modules
var Client = require('ftp');
var csv = require('fast-csv');
 
//ftp credentials, evetually we will extract this from a //DB of some sort
var hostName = "ftp.davidsonsinventory.com";
var userName = "ftp58074930-1e";
var password = "DavDealerInv";
var fileName = 'davidsons_firearm_attributes.csv';
 
// Here lies the meat and potatoes of the application
var c = new Client();
c.on('ready', function() {
    c.get(fileName, function(err, stream) {
        if (err) throw err;
        stream.once('close', function() { c.end(); });
        csv.fromStream(stream,  {headers: true})
            .on("data", function(data){
            console.log(data);
        })
            .on("end", function(){
                console.log("done");
            });
    });
});
c.connect({host:hostName,
    user: userName,
    password:password
});