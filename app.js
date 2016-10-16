// app.js  
  
var oracledb = require('oracledb');  
  
oracledb.getConnection({  
     user: "krames",  
     password: "GoGators54321",  
     connectString: "oracle.cise.ufl.edu:1521/orcl"  
}, function(err, connection) {  
     if (err) {  
          console.error(err.message);  
          return;  
     }  
     connection.execute( "select count (*) as total from TWEET",  
     [],  
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
  
function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  