
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var counter1 = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/counter/1', function (request, response) {
    console.log("counter has been requested");
    response.send(JSON.stringify({value : counter1}));
});

app.put('/counter/1', function (request, response) {
    console.log(request.body);
    counter1 = request.body.value;
    var json = JSON.stringify({});
    response.end(json);
});

app.listen(3000, function () {
    console.log("server started");
});
