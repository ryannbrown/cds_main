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
  //   stream.on('finish', function () {
  //     finishedCalls++
  //     console.log("number of calls", finishedCalls)
  //     fixInventoryFile();
  //     console.log("inventory downloaded")
  //     if (finishedCalls == 1) {
  //       console.log("all calls finished")
  //     c.end()
  //     }
  //   });
  // });
  // c.get('davidsons_quantity.csv', function (err, stream) {

  //   if (err) throw err;
  //   stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_quantity_today.csv'));
  //   stream.on('finish', function () {
  //     finishedCalls++
  //     console.log("number of calls", finishedCalls)
  //     fixQuantityFile();
  //     console.log("quantity downloaded")
  //     if (finishedCalls == 1) {
  //       console.log("all calls finished")
  //     c.end()
  //     }
  //   });
  // });

  c.get('davidsons_firearm_attributes.csv', function (err, stream) {
    // if (err) throw err;
    stream.pipe(fs.createWriteStream('C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv', 'utf8'));
    stream.on('finish', function () {
      finishedCalls++
      console.log("number of calls", finishedCalls)
      fixAttributeFile();
      console.log("attributes downloaded")
      if (finishedCalls == 1) {
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

    fs.readFile("C:/Users/Kathryn/Downloads/davidsons_quantity_today.csv", 'utf8', j = (err, data) => {
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
        // runInventoryQueries()
      });
    })

  }


      // fixAttributeFile();

  function fixAttributeFile() {

    fs.readFile("C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv", 'utf8', j = (err, data) => {
      var rows = data.split(/\r\n|\n/);
      // console.log(indexOf("American"));

      console.log(rows[0].slice(0, 1020))
      // console.log(rows)
      // console.log(changedRow)
      rows[0] = rows[0].slice(0, 1019) 

      console.log(rows)

      console.log("after", rows[0])
      for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].length == 0) {
          console.log("line to be removed:", rows[i], i)
          rows.splice(i, 1);
        }

      }

      var newData = rows.join('\n');


      fs.writeFile("C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv", newData, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The attr file was saved!");
        // runAttributeQueries()
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

  // attribute queries
    function runAttributeQueries() {
      pool.query('DROP TABLE IF EXISTS davidsons_attributes_new;CREATE TABLE davidsons_attributes_new(manuf varchar(100),ItemNo varchar(100),PriceSale varchar(100),ProdCat varchar(100),ShippingWeight varchar(100),ItemDesc1 varchar(100),ItemDesc2 varchar(100),UDC varchar(100),CC varchar(100),PQty varchar(100),DealerPrice varchar(100),RetailPrice varchar(100),SaleDateEnd varchar(100),SaleDateStart varchar(100),RetailMAP varchar(50),GunType varchar(100),CatNum varchar(100),UPC varchar(100),Brand varchar(100),Caliber varchar(100),BarrelLength varchar(100),OverallLength varchar(100),Weight varchar(100),Exclusive varchar(100),TALO varchar(100),SpecialEd varchar(100),ModelSeries varchar(100),Model varchar(100),FinishClass varchar(100),FinishFrame varchar(100),Slide varchar(100),BarrelLength2 varchar(100),OverallLength2 varchar(100),Weight2 varchar(100),CompactYouthLG varchar(100),Ladies varchar(100),LeftHand varchar(100),FrameMaterial varchar(100),HandgunFrameSize varchar(100),Safety varchar(100),SightFront varchar(100),SightRear varchar(100),ExtendedLength varchar(100),GOGSpecialEd varchar(100),ApolloCustom varchar(100),MagType varchar(100),FiringSys varchar(100),Trigger varchar(100),OpSys varchar(100),GasSysLength varchar(100),MagCount varchar(100),TrigPullAve varchar(100),Capacity varchar(100),BarrelConfig varchar(100),BarrelDesc varchar(100),Muzzle varchar(100),BarrelTwist varchar(100),ChamberLength varchar(100),BarrelRifled varchar(100),BarrelThreaded varchar(100),SuppressorReady varchar(100),Grips varchar(100),Stock varchar(100),ButtPlate varchar(100),Accessories varchar(100),TriggerGuard varchar(100),PullLengthMin varchar(100),PullLengthMax varchar(100),SlingAttach varchar(100),Optic varchar(100),ScopeBase varchar(100),ForendRail varchar(100),Chokes varchar(100),DrilledTapped varchar(100),Rings varchar(100),MultiChoke varchar(100),Embellishments varchar(100),Features1 varchar(100),Features2 varchar(100),Features3 varchar(100),CableTriggerLock varchar(100),SerialNumSpecial varchar(100),Packaging varchar(100),Importer varchar(100),Manufacturer varchar(100),RomanceCopy varchar(100),LogoFile varchar(100),KeywordPlatform varchar(100),Keyword1 varchar(100),Keyword2 varchar(100),Keyword3 varchar(100),Image1 varchar(100),Image2 varchar(100),Image3 varchar(100),Image4 varchar(100),Image5 varchar(100),Image6 varchar(100),Image7 varchar(100),Image8 varchar(100),Image9 varchar(100),Image10 varchar(100))'
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran first attribute query")
            aTwo()
          }
        });

    }

    function aTwo() {
      pool.query(`COPY davidsons_attributes_new(manuf,ItemNo,PriceSale,ProdCat,ShippingWeight,ItemDesc1,ItemDesc2,UDC,CC,PQty,DealerPrice,RetailPrice,SaleDateEnd,SaleDateStart,RetailMAP,GunType,CatNum,UPC,Brand,Caliber,BarrelLength,OverallLength,Weight,Exclusive,TALO,SpecialEd,ModelSeries,Model,FinishClass,FinishFrame,Slide,BarrelLength2,OverallLength2,Weight2,CompactYouthLG,Ladies,LeftHand,FrameMaterial,HandgunFrameSize,Safety,SightFront,SightRear,ExtendedLength,GOGSpecialEd,ApolloCustom,MagType,FiringSys,Trigger,OpSys,GasSysLength,MagCount,TrigPullAve,Capacity,BarrelConfig,BarrelDesc,Muzzle,BarrelTwist,ChamberLength,BarrelRifled,BarrelThreaded,SuppressorReady,Grips,Stock,ButtPlate,Accessories,TriggerGuard,PullLengthMin,PullLengthMax,SlingAttach,Optic,ScopeBase,ForendRail,Chokes,DrilledTapped,Rings,MultiChoke,Embellishments,Features1,Features2,Features3,CableTriggerLock,SerialNumSpecial,Packaging,Importer,Manufacturer,RomanceCopy,LogoFile,KeywordPlatform,Keyword1,Keyword2,Keyword3,Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8,Image9,Image10)FROM 'C:/Users/Kathryn/Downloads/davidsons_attributes_local.csv' DELIMITER ',' CSV HEADER`
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran second attributes!")
            aThree();
          }
        })

    }
    function aThree() {
      pool.query(`UPDATE davidsons_attributes_new
      SET retailmap = '0'
      WHERE retailmap = '12/1/2018'`
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran third attributes!")
            aFour();
          }
        })

    }
    function aFour() {
      pool.query(`ALTER TABLE davidsons_attributes_new 
      ALTER COLUMN retailmap TYPE numeric  USING retailmap::numeric`
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran 4th attributes!")
            // aFour();
          }
        })

    }

  // inventory queries
    function runInventoryQueries() {
      pool.query('DROP TABLE IF EXISTS davidsons_inventory_new;CREATE TABLE davidsons_inventory_new("Item #" varchar(50), "Item Description" varchar(50), MSP varchar(50) , "Retail Price" varchar(50), "Dealer Price" varchar(50), "Sale Price" varchar(50), "Sale Ends" varchar(50), Quantity varchar(50), "UPC Code" varchar(50), Manufacturer varchar(50), "Gun Type" varchar(50), "Model Series" varchar(50), Caliber varchar(50), Action varchar(50), Capacity varchar(50), Finish varchar(250),Stock varchar(250), Sights varchar(50), "Barrel Length" varchar(50), "Overall Length" varchar(50), Features varchar(250))'
        , (err, res) => {
          if (err) {
            throw (err);
          }
          console.log("res", res)
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
            iFive();
          }
        })

    }
    function iFive() {
      pool.query(`ALTER TABLE davidsons_inventory_new
      ADD COLUMN distributor VARCHAR(250);
      UPDATE davidsons_inventory_new SET "distributor" = 'davidsons'
      `
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran fifth!!")
            iSix();
          }
        })

    }
    function iSix() {
      pool.query(`
      SELECT * INTO davidsons_inventory_selected FROM davidsons_inventory_new 
      WHERE manufacturer ='FN America'
      OR manufacturer ='Streamlight'
      OR manufacturer ='DRD Tactical'
      OR manufacturer ='Shadow Systems'
      OR manufacturer ='Remington'
      OR manufacturer ='Smith & Wesson|Smith & Wesson Performance Ctr'
      OR manufacturer ='Nosler'
      OR manufacturer ='Marlin'
      OR manufacturer ='Sig Sauer'
      OR manufacturer ='Browning'
      OR manufacturer ='CMMG'
      OR manufacturer ='Walther Arms Inc'
      OR manufacturer ='B&T'
      OR manufacturer ='Beretta'
      OR manufacturer ='Glock'
      OR manufacturer ='Winchester'
      OR manufacturer ='Mossberg|Mossberg International'
      OR manufacturer ='Christenson Arms'
      OR manufacturer ='LEGACY SPORTS INTL|HOWA'
      OR manufacturer ='Kimber'
      OR manufacturer ='Magnum Research'
      OR manufacturer ='Ruger'
      OR manufacturer ='Windham Weaponry'
      OR manufacturer ='CZ-USA'
      OR manufacturer ='Federal'
      OR manufacturer ='Barrett'
      OR manufacturer ='Ameriglo'
      OR manufacturer ='Smith & Wesson'
      OR manufacturer ='IWI-US'
      OR manufacturer ='Mossberg'
      OR manufacturer ='Holosun'
      OR manufacturer ='Beretta|Tikka'
      OR manufacturer ='Heckler & Koch'
      OR manufacturer ='Les Baer Custom'
      OR manufacturer ='POF-USA'
      OR manufacturer ='Fiocchi'
      OR manufacturer ='Trijicon'
      OR manufacturer ='Winchester Repeating Arms'
      OR manufacturer ='Wilson Combat'
      OR manufacturer ='Zev Technologies'
      OR manufacturer ='Century Arms'
      OR manufacturer ='Kel-Tec';
      
      `
        , (err, res) => {
          if (err) {
            throw (err);
          }
          // console.log("res", res)
          if (res) {
            console.log("ran six, trimmed manufacturers!!")
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

    // \COPY davidsons_quantity(Item_Number, UPC_Code, Quantity_NC, Quantity_AZ)FROM 'C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv' DELIMITER ',' CSV HEADER

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





