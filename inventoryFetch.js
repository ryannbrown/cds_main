var Client = require('ftp');
var fs = require('fs');
require('dotenv').config();


var Client = require('ftp');
 

var c = new Client();
c.on('ready', function() {
  c.get('davidsons_inventory.csv', function(err, stream) {
    if (err) throw err;
    stream.pipe(fs.createWriteStream('davidsons_inventory_local.csv'));
    console.log("downloaded")
  });
  c.get('davidsons_quantity.csv', function(err, stream) {
    if (err) throw err;
 
    stream.pipe(fs.createWriteStream('davidsons_quantity_local.csv'));
    console.log("downloaded")
  });
  c.get('davidsons_firearm_attributes.csv', function(err, stream) {
    if (err) throw err;
    stream.pipe(fs.createWriteStream('davidsons_attributes_local.csv'));
    console.log("downloaded")
    c.end();
  });

});


  
  // connect to localhost:21 as anonymous
  c.connect({
    host: process.env.ftpHost,
    // port: ,
    user: process.env.ftpUser, 
    password: process.env.ftpPassword
  }
  );


//   pool.query('DROP TABLE IF EXISTS davidsons_quantity_new;CREATE TABLE davidsons_quantity_new(Item_Number varchar(50), UPC_Code varchar(50), Quantity_AZ varchar(50), Quantity_NC varchar(50), total_quantity integer)'
// );

// pool.query("COPY davidsons_quantity_new(Item_Number, UPC_Code, Quantity_NC, Quantity_AZ)FROM 'C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv' DELIMITER ',' CSV HEADER"
// )

// pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_az !~ '^[0-9]+$')")
// // pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_nc !~ '^[0-9]+$')")
// pool.query("ALTER TABLE davidsons_quantity_new ALTER COLUMN quantity_az TYPE INT using quantity_az::integer, ALTER COLUMN quantity_nc TYPE INT using quantity_nc::integer;")
// pool.query("UPDATE davidsons_quantity_new SET total_quantity = quantity_nc + quantity_az;")
