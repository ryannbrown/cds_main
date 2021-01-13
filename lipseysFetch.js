var Client = require('ftp');
var fs = require('fs');
require('dotenv').config();
const csv = require('csv-parser')
// const fs = require('fs')
var pg = require('pg');
var Client = require('ftp');




// var c = new Client();
//   c.on('ready', function() {

//     let finishedCalls = 0

//     c.list(function(err, list) {
//       if (err) throw err;
//       // console.dir(list);
//     //   c.end();
//     });
//     c.get('/Inventory/zandersinv.csv', function(err, stream) {
//         if (err) throw err;
//         // stream.once('close', function() { c.end(); });
//         stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/zanders.csv'));
//         stream.on('finish', function () {
//           finishedCalls ++
//           console.log("got here!")
//           fixInventoryFile();
//           if (finishedCalls == 2 ) {
//             c.end()
//           }
        
//         });
//       });
//     // c.get('/Inventory/itemimagelinks.csv', function(err, stream) {
//     //     if (err) throw err;
//     //     // stream.once('close', function() { c.end(); });
//     //     stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/zanders_images.csv'));
//     //     stream.on('finish', function () {
//     //       finishedCalls++
//     //       console.log("got here!")
//     //       fixImagesFile();
//     //       if (finishedCalls == 3) {
//     //         c.end()
//     //       }
      
//     //     });
//     //   });
//     c.get('/Inventory/Liveinv.csv', function(err, stream) {
//         if (err) throw err;
//         // stream.once('close', function() { c.end(); });
//         stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/zanders_quantity.csv'));
//         stream.on('finish', function () {
//           finishedCalls++
//           console.log("got here!")
//           fixQuantityFile();
//           if (finishedCalls == 2) {
//             c.end()
//           }
      
//         });
//       });
      
//   });
  // connect to localhost:21 as anonymous
  // c.connect();


//   });



  // connect to localhost:21 as anonymous
//   c.connect({
//     host: "ftp2.gzanders.com",
//     // port: ,
//     user: "ColemanDefense",
//     password: "Durham801"
//   }
//   );

  // var filename = "C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv"


//   var conString = process.env.CONNSTRING //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
// });


  const Pool = require('pg').Pool
  const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'postgres',
    password: process.env.DB_PASS,
    port: 5432,
  })


fixInventoryFile();

 function fixInventoryFile() {

    fs.readFile("C:/Users/Kathryn/Downloads/lcat.csv", 'utf8', j = (err, data) => {
      var rows = data.split(/\r\n|\n/);
      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].length == 0) {
          console.log("line to be removed:", rows[i], i)
          rows.splice(i, 1);
        }

      }

      var newData = rows.join('\n');
      fs.writeFile("C:/Users/Kathryn/Downloads/lcat_new.csv", newData, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The inv file was saved!");
        // runInventoryQueries()
      });

    })

  }



  function runQuantityQueries() {
    pool.query('DROP TABLE IF EXISTS lipseys_inventory;CREATE TABLE lipseys_inventory(ITEMNO varchar (150), DESCRIPTION1 varchar(250), DESCRIPTION2 varchar(250), UPC varchar(250), MANUFACTURERMODELNO varchar(100), MSRP numeric, MODEL varchar(250), CALIBERGAUGE varchar(100), MANUFACTURER varchar(250), TYPE varchar(250), ACTION varchar(250), BARRELLENGTH varchar(250), CAPACITY varchar(250), FINISH varchar(250), OVERALLLENGTH varchar(250), RECEIVER varchar(250), SAFETY varchar(250), SIGHTS varchar(250), STOCKFRAMEGRIPS varchar(250), MAGAZINE varchar(250), WEIGHT varchar(250), IMAGENAME varchar(250), CHAMBER varchar(250), DRILLEDANDTAPPED varchar(250), RATEOFTWIST varchar(250), ITEMTYPE varchar(250), ADDITIONALFEATURE1 varchar(250), ADDITIONALFEATURE2 varchar(250),ADDITIONALFEATURE3 varchar(250),SHIPPINGWEIGHT varchar(250),BOUNDBOOKMANUFACTURER varchar(250),BOUNDBOOKMODEL varchar(250),BOUNDBOOKTYPE varchar(250),NFATHREADPATTERN varchar(250),NFAATTACHMENTMETHOD varchar(250),NFABAFFLETYPE varchar(250),SILENCERCANBEDISASSEMBLED varchar(250),SILENCERCONSTRUCTIONMATERIAL varchar(250),NFADBREDUCTION varchar(250),SILENCEROUTSIDEDIAMETER varchar(250),NFAFORM3CALIBER varchar(250),OPTICMAGNIFICATION varchar(250),MAINTUBESIZE varchar(250),ADJUSTABLEOBJECTIVE varchar(250),OBJECTIVESIZE varchar(250),OPTICADJUSTMENTS varchar(250),ILLUMINATEDRETICLE varchar(250),RETICLE varchar(250),EXCLUSIVE varchar(250),QUANTITY integer,ALLOCATED varchar(250),ONSALE varchar(250),PRICE numeric,CURRENTPRICE numeric,RETAILMAP numeric,FFLREQUIRED varchar(250),SOTREQUIRED varchar(250),EXCLUSIVETYPE varchar(250))'
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("ran first quantity query")
          qTwo()
        }
      });
    // console.log("ran quantity")

// psql shell command
    // \COPY zanders_quantity(itemnumber, available, price1, price2, price3, qty1, qty2, qty3) FROM 'C:/Users/Kathryn/Downloads/zanders_quantity_new.csv' DELIMITER ',' CSV HEADER

  }
  function qTwo() {
    pool.query(`COPY lipseys_inventory(ITEMNO,DESCRIPTION1,DESCRIPTION2,UPC,MANUFACTURERMODELNO,MSRP,MODEL,CALIBERGAUGE,MANUFACTURER,TYPE,ACTION,BARRELLENGTH,CAPACITY,FINISH,OVERALLLENGTH,RECEIVER,SAFETY,SIGHTS,STOCKFRAMEGRIPS,MAGAZINE,WEIGHT,IMAGENAME,CHAMBER,DRILLEDANDTAPPED,RATEOFTWIST,ITEMTYPE,ADDITIONALFEATURE1,ADDITIONALFEATURE2,ADDITIONALFEATURE3,SHIPPINGWEIGHT,BOUNDBOOKMANUFACTURER,BOUNDBOOKMODEL,BOUNDBOOKTYPE,NFATHREADPATTERN,NFAATTACHMENTMETHOD,NFABAFFLETYPE,SILENCERCANBEDISASSEMBLED,SILENCERCONSTRUCTIONMATERIAL,NFADBREDUCTION,SILENCEROUTSIDEDIAMETER,NFAFORM3CALIBER,OPTICMAGNIFICATION,MAINTUBESIZE,ADJUSTABLEOBJECTIVE,OBJECTIVESIZE,OPTICADJUSTMENTS,ILLUMINATEDRETICLE,RETICLE,EXCLUSIVE,QUANTITY,ALLOCATED,ONSALE,PRICE,CURRENTPRICE,RETAILMAP,FFLREQUIRED,SOTREQUIRED,EXCLUSIVETYPE) FROM 'C:/Users/Kathryn/Downloads/lcat_new.csv' DELIMITER ',' CSV HEADER`
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("added quantity data")
          // iThree();
        }
      })

  }
  function runInventoryQueries() {
    pool.query('DROP TABLE IF EXISTS lipseys_inventory;CREATE TABLE lipseys_inventory(ITEMNO varchar (150), DESCRIPTION1 varchar(250), DESCRIPTION2 varchar(250), UPC varchar(250), MANUFACTURERMODELNO varchar(100), MSRP numeric, MODEL varchar(250), CALIBERGAUGE varchar(100), MANUFACTURER varchar(250), TYPE varchar(250), ACTION varchar(250), BARRELLENGTH varchar(250), CAPACITY varchar(250), FINISH varchar(250), OVERALLLENGTH varchar(250), RECEIVER varchar(250), SAFETY varchar(250), SIGHTS varchar(250), STOCKFRAMEGRIPS varchar(250), MAGAZINE varchar(250), WEIGHT varchar(250), IMAGENAME varchar(250), CHAMBER varchar(250), DRILLEDANDTAPPED varchar(250), RATEOFTWIST varchar(250), ITEMTYPE varchar(250), ADDITIONALFEATURE1 varchar(250), ADDITIONALFEATURE2 varchar(250),ADDITIONALFEATURE3 varchar(250),SHIPPINGWEIGHT varchar(250),BOUNDBOOKMANUFACTURER varchar(250),BOUNDBOOKMODEL varchar(250),BOUNDBOOKTYPE varchar(250),NFATHREADPATTERN varchar(250),NFAATTACHMENTMETHOD varchar(250),NFABAFFLETYPE varchar(250),SILENCERCANBEDISASSEMBLED varchar(250),SILENCERCONSTRUCTIONMATERIAL varchar(250),NFADBREDUCTION varchar(250),SILENCEROUTSIDEDIAMETER varchar(250),NFAFORM3CALIBER varchar(250),OPTICMAGNIFICATION varchar(250),MAINTUBESIZE varchar(250),ADJUSTABLEOBJECTIVE varchar(250),OBJECTIVESIZE varchar(250),OPTICADJUSTMENTS varchar(250),ILLUMINATEDRETICLE varchar(250),RETICLE varchar(250),EXCLUSIVE varchar(250),QUANTITY varchar(250),ALLOCATED varchar(250),ONSALE varchar(250),PRICE numeric,CURRENTPRICE numeric,RETAILMAP numeric,FFLREQUIRED varchar(250),SOTREQUIRED varchar(250),EXCLUSIVETYPE varchar(250))'
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
    pool.query(`COPY lipseys_inventory(ITEMNO,DESCRIPTION1,DESCRIPTION2,UPC,MANUFACTURERMODELNO,MSRP,MODEL,CALIBERGAUGE,MANUFACTURER,TYPE,ACTION,BARRELLENGTH,CAPACITY,FINISH,OVERALLLENGTH,RECEIVER,SAFETY,SIGHTS,STOCKFRAMEGRIPS,MAGAZINE,WEIGHT,IMAGENAME,CHAMBER,DRILLEDANDTAPPED,RATEOFTWIST,ITEMTYPE,ADDITIONALFEATURE1,ADDITIONALFEATURE2,ADDITIONALFEATURE3,SHIPPINGWEIGHT,BOUNDBOOKMANUFACTURER,BOUNDBOOKMODEL,BOUNDBOOKTYPE,NFATHREADPATTERN,NFAATTACHMENTMETHOD,NFABAFFLETYPE,SILENCERCANBEDISASSEMBLED,SILENCERCONSTRUCTIONMATERIAL,NFADBREDUCTION,SILENCEROUTSIDEDIAMETER,NFAFORM3CALIBER,OPTICMAGNIFICATION,MAINTUBESIZE,ADJUSTABLEOBJECTIVE,OBJECTIVESIZE,OPTICADJUSTMENTS,ILLUMINATEDRETICLE,RETICLE,EXCLUSIVE,QUANTITY,ALLOCATED,ONSALE,PRICE,CURRENTPRICE,RETAILMAP,FFLREQUIRED,SOTREQUIRED,EXCLUSIVETYPE) FROM 'C:/Users/Kathryn/Downloads/lcat_new.csv' DELIMITER ',' CSV HEADER`
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("ran second")
          // iThree();
        }
      })

  }


  function runImageQueries() {
    pool.query('DROP TABLE IF EXISTS zanders_images;CREATE TABLE zanders_images(ItemNumber varchar (150), ImageLink varchar(250))'
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("ran first image query")
          imageTwo()
        }
      });

  }

  function imageTwo() {
    pool.query(`COPY zanders_images(ItemNumber, ImageLink)FROM 'C:/Users/Kathryn/Downloads/zanders_images_new.csv' DELIMITER ',' CSV HEADER`
      , (err, res) => {
        if (err) {
          throw (err);
        }
        // console.log("res", res)
        if (res) {
          console.log("image csv to db")
          // iThree();
        }
      })

  }