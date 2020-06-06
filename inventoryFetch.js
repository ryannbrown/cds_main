var Client = require('ftp');
var fs = require('fs');
require('dotenv').config();
const csv = require('csv-parser')
// const fs = require('fs')

var Client = require('ftp');




var c = new Client();
c.on('ready', function () {

  var finishedCalls = 0;
  // c.get('davidsons_inventory.csv', function (err, stream) {
  //   // console.log(stream)
  //   if (err) throw err;
  //   stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_inventory_local.csv'));
  //   console.log("downloaded")
  //   fixFile();
  // });
  c.get('davidsons_quantity.csv', function (err, stream) {

    if (err) throw err;
    stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv'));
    stream.on('finish', function () {
      finishedCalls++
      console.log("number of calls", finishedCalls)
      fixQuantityFile();
      console.log("finished!")
    });
  });

  // c.get('davidsons_firearm_attributes.csv', function (err, stream) {
  //   if (err) throw err;
  //   stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv'));
  //   console.log("downloaded")
  //   while (finishedCalls == 1) {
  //     console.log("calls finished")
  //     c.end();
  //   }
  });

  // });



  // connect to localhost:21 as anonymous
  c.connect({
    host: process.env.ftpHost,
    // port: ,
    user: process.env.ftpUser,
    password: process.env.ftpPassword
  }
  );

  var filename = "C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv"


  function fixQuantityFile() {

    fs.readFile(filename, 'utf8', j = (err, data) => {
      var rows = data.split(/\r\n|\n/);
      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].length == 0) {
          console.log("line to be removed:", rows[i], i)
          rows.splice(i, 1);
        }

      }

      var newData = rows.join('\n');
      fs.writeFile("C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv", newData, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
        runQuantityQueries()
      });

    })

  }



  const Pool = require('pg').Pool
  const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'postgres',
    password: process.env.DB_PASS,
    port: 5432,
  })

  function runQuantityQueries() {
    pool.query('DROP TABLE IF EXISTS davidsons_quantity_new;CREATE TABLE davidsons_quantity_new(Item_Number varchar(50), UPC_Code varchar(50), Quantity_AZ varchar(50), Quantity_NC varchar(50), total_quantity integer)'
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("ran first")
          secondQ()
        }
      });

  }

  function secondQ() {
    pool.query("COPY davidsons_quantity_new(Item_Number, UPC_Code, Quantity_NC, Quantity_AZ)FROM 'C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv' DELIMITER ',' CSV HEADER"
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("ran second")
          thirdQ();
        }
      })

  }

  function thirdQ() {
    pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_az !~ '^[0-9]+$');DELETE FROM davidsons_quantity_new WHERE (quantity_nc !~ '^[0-9]+$')", (err, res) => {
      // console.log("res", res)
      if (err) {
        throw (err);
      }
      if (res) {
        console.log("ran third")
        fourthQ();
      }
    })
    // fourthQ()
  }

  function fourthQ() {
    pool.query("ALTER TABLE davidsons_quantity_new ALTER COLUMN quantity_az TYPE INT using quantity_az::integer, ALTER COLUMN quantity_nc TYPE INT using quantity_nc::integer;", (err, res) => {
      // console.log("res", res)
      if (err) {
        throw (err);
      }
      if (res) {
        console.log("ran 4th")
        fifthQ();
      }
    })
    // console.log("4th done, now to final")
    fifthQ();
  }


  function fifthQ() {
    pool.query("UPDATE davidsons_quantity_new SET total_quantity = quantity_nc + quantity_az;")
  }





