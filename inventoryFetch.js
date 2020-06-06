var Client = require('ftp');
var fs = require('fs');
require('dotenv').config();
const csv = require('csv-parser')
// const fs = require('fs')

var Client = require('ftp');




var c = new Client();
c.on('ready', function () {

  var finishedCalls = 0;
  c.get('davidsons_inventory.csv', function (err, stream) {
    // console.log(stream)
    if (err) throw err;
    stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_inventory_local.csv'));
    stream.on('finish', function () {
      finishedCalls++
      console.log("number of calls", finishedCalls)
      fixInventoryFile();
      console.log("inventory downloaded")
      if (finishedCalls == 3) {
        console.log("all calls finished")
      c.end()
      }
    });
  });
  c.get('davidsons_quantity.csv', function (err, stream) {

    if (err) throw err;
    stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv'));
    stream.on('finish', function () {
      finishedCalls++
      console.log("number of calls", finishedCalls)
      // fixQuantityFile();
      console.log("quantity downloaded")
      if (finishedCalls == 3) {
        console.log("all calls finished")
      c.end()
      }
    });
  });

  c.get('davidsons_firearm_attributes.csv', function (err, stream) {
    // if (err) throw err;
    stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv'));
    stream.on('finish', function () {
      finishedCalls++
      console.log("number of calls", finishedCalls)
      // fixQuantityFile();
      console.log("attributes downloaded")
      if (finishedCalls == 3) {
        console.log("all calls finished")
      c.end()
      }
    });
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

  // var filename = "C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv"


  function fixQuantityFile() {

    fs.readFile("C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv", 'utf8', j = (err, data) => {
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
        console.log("The quant file was saved!");
        runQuantityQueries()
      });

    })

  }
  function fixInventoryFile() {

    fs.readFile("C:/Users/Kathryn/Downloads/davidsons_inventory_local.csv", 'utf8', j = (err, data) => {
      var rows = data.split(/\r\n|\n/);
      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].length == 0) {
          console.log("line to be removed:", rows[i], i)
          rows.splice(i, 1);
        }

      }

      var newData = rows.join('\n');
      fs.writeFile("C:/Users/Kathryn/Downloads/davidsons_inventory_local.csv", newData, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The inv file was saved!");
        runInventoryQueries()
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



  // Item #, Item Description, MSP, Retail Price, Dealer Price, Sale Price, Sale Ends, Quantity, UPC Code, Manufacturer, Gun Type, Model Series, Caliber, Action, Capacity, Finish,Stock, Sights, Barrel Length, Overall Length, Features
  

  // quantity queries
    function runInventoryQueries() {
      pool.query('DROP TABLE IF EXISTS davidsons_inventory_new;CREATE TABLE davidsons_inventory_new("Item #" varchar(50), "Item Description" varchar(50), MSP varchar(50) , "Retail Price" varchar(50), "Dealer Price" varchar(50), "Sale Price" varchar(50), "Sale Ends" varchar(50), Quantity varchar(50), "UPC Code" varchar(50), Manufacturer varchar(50), "Gun Type" varchar(50), "Model Series" varchar(50), Caliber varchar(50), Action varchar(50), Capacity varchar(50), Finish varchar(250),Stock varchar(250), Sights varchar(50), "Barrel Length" varchar(50), "Overall Length" varchar(50), Features varchar(250))'
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran first inventory query")
            iTwo()
          }
        });

    }

    function iTwo() {
      pool.query(`COPY davidsons_inventory_new("Item #", "Item Description", MSP, "Retail Price", "Dealer Price", "Sale Price", "Sale Ends", Quantity, "UPC Code", Manufacturer, "Gun Type" , "Model Series" , Caliber , Action , Capacity , Finish ,Stock , Sights , "Barrel Length" , "Overall Length" , Features )FROM 'C:/Users/Kathryn/Downloads/davidsons_inventory_local.csv' DELIMITER ',' CSV HEADER`
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran second")
            iThree();
          }
        })

    }
    function iThree() {
      pool.query(`ALTER TABLE davidsons_inventory_new
      ALTER COLUMN MSP TYPE money  USING MSP::money,
      ALTER COLUMN "Retail Price" TYPE money  USING "Retail Price"::money,
      ALTER COLUMN "Dealer Price" TYPE money  USING "Dealer Price"::money;
      `
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran third")
            iFour();
          }
        })

    }
    function iFour() {
      pool.query(`ALTER TABLE davidsons_inventory_new
      ALTER COLUMN MSP TYPE numeric  USING MSP::numeric,
      ALTER COLUMN "Retail Price" TYPE numeric  USING "Retail Price"::numeric,
      ALTER COLUMN "Dealer Price" TYPE numeric  USING "Dealer Price"::numeric;
      `
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran fourth!!")
            // qThree();
          }
        })

    }









  // quantity queries
    function runQuantityQueries() {
      pool.query('DROP TABLE IF EXISTS davidsons_quantity_new;CREATE TABLE davidsons_quantity_new(Item_Number varchar(50), UPC_Code varchar(50), Quantity_AZ varchar(50), Quantity_NC varchar(50), total_quantity integer)'
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran first")
            qTwo()
          }
        });

    }

    function qTwo() {
      pool.query("COPY davidsons_quantity_new(Item_Number, UPC_Code, Quantity_NC, Quantity_AZ)FROM 'C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv' DELIMITER ',' CSV HEADER"
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran second")
            qThree();
          }
        })

    }

    function qThree() {
      pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_az !~ '^[0-9]+$');DELETE FROM davidsons_quantity_new WHERE (quantity_nc !~ '^[0-9]+$')", (err, res) => {
        // console.log("res", res)
        if (err) {
          throw (err);
        }
        if (res) {
          console.log("ran third")
          qFour();
        }
      })
      // fourthQ()
    }

    function qFour() {
      pool.query("ALTER TABLE davidsons_quantity_new ALTER COLUMN quantity_az TYPE INT using quantity_az::integer, ALTER COLUMN quantity_nc TYPE INT using quantity_nc::integer;", (err, res) => {
        // console.log("res", res)
        if (err) {
          throw (err);
        }
        if (res) {
          console.log("ran 4th")
          qFive();
        }
      })
      // console.log("4th done, now to final")
      // qFive();
    }


    function qFive() {
      pool.query("UPDATE davidsons_quantity_new SET total_quantity = quantity_nc + quantity_az;")
    }





