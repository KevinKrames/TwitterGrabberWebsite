module.exports = require('./lib/oracledb.js');
var express = require('express');
var app = express();
var oracledb = require('oracledb');

var data = "";

function queryOracle(var queryString) {
	oracledb.getConnection({  
     user: "krames",  
     password: "GoGators54321",  
     connectString: "oracle.cise.ufl.edu:1521/orcl"  
}, function(err, connection) {  
     if (err) {  
          console.error(err.message);  
          return;  
     }  
     connection.execute(queryString,  
     data = [],  
     function(err, result) {  
          if (err) {  
               console.error(err.message);  
               doRelease(connection);  
               return;  
          }  
          console.log(result.metaData);  
          console.log(result.rows);  
          doRelease(connection);  
     });  
});  
}
function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  


app.set('port', (process.env.PORT || 5000));
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post("/", function (req, res) {
    if (req.body.oracleQuery != null) {
    	oracleQuery(req.body.oracleQuery);
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});