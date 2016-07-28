var express = require('express');
var app = express();

app.use(express.static('public'));
console.log(__dirname)

app.get('/pokemonmap.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "public/templates/pokemonmap.htm" );
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});