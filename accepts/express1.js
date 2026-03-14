var express = require('express')
var app = express()
const logger = function (req, res, next) {
 console.log('caught intrusion');
 next();
}
app.use(logger);
app.get('/', function (req, res) {
 res.send('Express middleware tutorial');
});
app.listen(7000);
console.log ("App running on port 7000")