var http = require("http");
var url = require("url");

var   express = require('express'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request'),
      path = require('path'),
      bodyParser = require('body-parser'),
      //db = require('./database'),
      app = express();

//app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/public', express.static(__dirname + '/public'));
app.use('/graphics', express.static(__dirname + '/graphics'));
app.use('/common', express.static(__dirname + '/common'));
app.use('/js', express.static(__dirname + '/js'));
// Tags
var latestBlockChainJsonURL = "https://blockchain.info/fr/latestblock";
var getHashByHeightURL = "https://blockexplorer.com/api/block-index/";


app.get('/', function (req, res) {
    var url = latestBlockChainJsonURL;
    var lastBlock = { height : "", hash : "", time : ""};

    var req = request(url, function(error, response, html){ // ! async !
        if(!error){
            var jsonResult = JSON.parse(html);
            lastBlock.height = jsonResult.height;
            lastBlock.hash = jsonResult.hash;
            lastBlock.time = jsonResult.time;
            console.log(lastBlock.hash);
			
			var phrase = "var hash =" + "'" + lastBlock.hash + "'" + ";" ;
			fs.writeFileSync('./js/hash.js', phrase);
			
			//fs.writeFileSync('./hash.txt',lastBlock.hash);

            // fetching html file
            // fill the accueil view and send it !
            fs.readFile('./final.html','utf8', function (err, html) {
                 if (err) {
                     throw err;
                 }
                 else {
                   res.contentType('text/html');
                  res.send(html);
                 }
             });
		    }

    });

});


var server = app.listen(2001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

/*
//fichier b 
var var1 = 3;
//fichier a
<script src="fichierb.js"</script>
	
	<script></script> 
	
	<script>
	var2 = 0;
	var2 = var1
	document.write(var2);		
	</script>
*/