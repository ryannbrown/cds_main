const express = require('express');
const bodyParser = require('body-parser');
var Client = require('ftp');
var fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;


const morgan = require('morgan');
const router = require("express").Router();
const path = require("path");

// aws bucket
const AWS = require('aws-sdk');
require('dotenv').config();
const Busboy = require('busboy');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser')
const cors = require('cors')
app.use(cors());

app.use(morgan('dev'));

app.use(busboy())
app.use(busboyBodyParser())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// var c = new Client();
// c.on('ready', function() {
//   // c.list(function(err, list) {
//   //   if (err) throw err;
//   //   console.dir(list);
//   // })
//   c.get('davidsons_inventory.csv', function(err, stream) {
//     if (err) throw err;
//     stream.pipe(fs.createWriteStream('davidsons_inventory_local.csv'));
//     console.log("downloaded")
//   });
//   c.get('davidsons_quantity.csv', function(err, stream) {
//     if (err) throw err;
 
//     stream.pipe(fs.createWriteStream('davidsons_quantity_local.csv'));
//     console.log("downloaded")
//   });
//   c.get('davidsons_firearm_attributes.csv', function(err, stream) {
//     if (err) throw err;
//     stream.pipe(fs.createWriteStream('davidsons_attributes_local.csv'));
//     console.log("downloaded")
//     c.end();
//   });

// });


  
//   // connect to localhost:21 as anonymous
//   c.connect({
//     host: process.env.ftpHost,
//     // port: ,
//     user: process.env.ftpUser, 
//     password: process.env.ftpPassword
//   }
//   );




var pg = require('pg');

var conString = process.env.CONNSTRING //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
});



//   app.get('/', function(req, res){
//     res.send({answer: "hello world!"});
// })


// GET CUSTOM INVENTORY
app.options('/api/posts', cors())
app.get('/api/posts', cors(), function (req, response) {

  client.query(
    "SELECT * from cds_inventory", (error, results) => {
      if (error) {
        throw error
      }
      var data = results.rows
      response.send(JSON.stringify({ data }));
    }
  );
})

app.get('/api/posts/:id', cors(), function (req, response) {
  var gun_id = req.params.id;
  client.query(
    `SELECT * from cds_inventory WHERE uuid = '${gun_id}'`, (error, results) => {
      if (error) {
        throw error
      }
      var data = results.rows
      response.send(JSON.stringify({ data }));
    }
  );
})


//    POST CUSTOM INVENTORY
let posts = []
app.post('/api/post', function (req, res) {
  console.log("keys")
  const data = {
    image: req.body.image,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    msrp_price: req.body.msrp_price,
    sale_price: req.body.sale_price
  };

  posts.push(data)

  const query = `INSERT INTO cds_inventory( uuid, image, product_name,Product_description, msrp_price, sale_price)
     VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5)`
  const values = [data.image, data.product_name, data.product_description, data.msrp_price, data.sale_price];
  //  FOR DEV
  //  console.log(query)
  //  console.log(values)

  client.query(query, values, (error, results) => {
    if (error) {
      throw error
    }
    res.send('POST request to the homepage')
  }
  );
})

//    DELETE CUSTOM INVENTORY
app.delete('/api/remove_post', function (req, response) {
  let id = req.body.id
  console.log(id);
  client.query(
    `DELETE FROM cds_inventory WHERE id = '${id}' `, (error, results) => {
      console.log(error, results);
      if (error) {
        throw error
      }

      // var data = results.rows
      var data = results.rows
      response.send(JSON.stringify({ data }));
    }
  );
})




const BUCKET_NAME = process.env.NAME;
const ACCESS = process.env.ACCESS
const SECRET = process.env.SECRET

// TODO: be able to remove pictures from S3 programmatically? 
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: ACCESS,
    secretAccessKey: SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
}

app.post('/api/upload', function (req, res, next) {

  console.log("body", req.body)
  // console.log("req", req)
  const element1 = req.body.element1;
  console.log(element1)
  var busboy = new Busboy({ headers: req.headers });

  // The file upload has completed
  busboy.on('finish', function () {
    console.log('Upload finished');
    const file = req.files.element1;
    console.log(file);

    uploadToS3(file);
  });

  req.pipe(busboy);
});



// INACTIVE DB
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'postgres',
  password: process.env.DB_PASS,
  port: 5432,
})
// Item_Number, UPC_Code, Quantity_NC, Quantity_AZ

// pool.query('DROP TABLE IF EXISTS davidsons_quantity_new;CREATE TABLE davidsons_quantity_new(Item_Number varchar(50), UPC_Code varchar(50), Quantity_AZ varchar(50), Quantity_NC varchar(50), total_quantity integer)'
// );

// pool.query("COPY davidsons_quantity_new(Item_Number, UPC_Code, Quantity_NC, Quantity_AZ)FROM 'C:/Users/Kathryn/Downloads/davidsons_quantity_local.csv' DELIMITER ',' CSV HEADER"
// )

// pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_az !~ '^[0-9]+$')")
// // pool.query("DELETE FROM davidsons_quantity_new WHERE (quantity_nc !~ '^[0-9]+$')")
// pool.query("ALTER TABLE davidsons_quantity_new ALTER COLUMN quantity_az TYPE INT using quantity_az::integer, ALTER COLUMN quantity_nc TYPE INT using quantity_nc::integer;")
// pool.query("UPDATE davidsons_quantity_new SET total_quantity = quantity_nc + quantity_az;")

app.get('/browse/:criteria', (req, response) => {
  var criteria = req.params.criteria;
  console.log("criteria", criteria);
  // WHERE ${criteria} IS NOT NULL
  pool.query(`SELECT DISTINCT "${criteria}" FROM davidsons_inventory_new
  WHERE "${criteria}" IS NOT NULL
  ORDER BY "${criteria}" DESC`, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));
  });


})

// TODO: Change inventory to davidsons_inventory
// TO DO : SLIM ALL THIS DOWN 
// MANUFACTURER
app.get('/manufacturer/:manufacturer/:sort', (req, response) => {

  // const data = {
  //   manufacturer: req.params.manufacturer
  // }
  var manufacturer = req.params.manufacturer;
  var sort = req.params.sort;
  // var sortString;
let query = `SELECT *
  FROM davidsons_inventory_new
  LEFT JOIN davidsons_attributes_new
  ON davidsons_attributes_new.itemno = davidsons_inventory_new."Item #"
  LEFT JOIN davidsons_quantity_new
  ON davidsons_inventory_new."Item #" = davidsons_quantity_new.item_number
  WHERE davidsons_inventory_new.manufacturer ILIKE '${manufacturer}'`;
  // const values = [data.manufacturer];

  // Removed below in order to start using sort params
  // ORDER BY
  // total_quantity DESC`;

  if (sort == 'priceUp') {
    query += `ORDER BY "Dealer Price" ASC`
  } else if (sort == 'priceDown') {
    query += `ORDER BY "Dealer Price" DESC`
  } else if (sort == 'priceUpInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`
  } else if (sort == 'quantityDown') {
    query += `ORDER BY total_quantity DESC`
  } else if (sort == 'priceDownInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `
  } else if (sort == 'onlyInStock') {
    query += `AND total_quantity > 0 `
  }
  console.log("query", query)
  // console.log(manufacturer);
console.log("sort:", sort)
  pool.query(query,
    //  values,
      (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/gun_type/:gun_type/:sort', (req, response) => {
  var gun_type = req.params.gun_type;
  var sort = req.params.sort;
  console.log("these are the params")
  console.log(gun_type);

  let query = `SELECT *
  FROM davidsons_inventory_new
  LEFT JOIN davidsons_attributes_new
  ON davidsons_attributes_new.itemno = davidsons_inventory_new."Item #"
  LEFT JOIN davidsons_quantity_new
  ON davidsons_inventory_new."Item #" = davidsons_quantity_new.item_number
  WHERE davidsons_inventory_new."Gun Type" ILIKE '%${gun_type}%'`


  if (sort == 'priceUp') {
    query += `ORDER BY "Dealer Price" ASC`
  } else if (sort == 'priceDown') {
    query += `ORDER BY "Dealer Price" DESC`
  } else if (sort == 'priceUpInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`
  } else if (sort == 'quantityDown') {
    query += `ORDER BY total_quantity DESC`
  } else if (sort == 'priceDownInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `
  } else if (sort == 'onlyInStock') {
    query += `AND total_quantity > 0 `
  }

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/caliber/:caliber/:sort', (req, response) => {
  var caliber = req.params.caliber;
  var sort = req.params.sort;
  console.log(caliber);

 let query = `SELECT *
  FROM davidsons_inventory_new
  LEFT JOIN davidsons_attributes_new
  ON davidsons_attributes_new.itemno = davidsons_inventory_new."Item #"
  LEFT JOIN davidsons_quantity_new
  ON davidsons_inventory_new."Item #" = davidsons_quantity_new.item_number
  WHERE davidsons_inventory_new.caliber ILIKE '%${caliber}%'`

  if (sort == 'priceUp') {
    query += `ORDER BY "Dealer Price" ASC`
  } else if (sort == 'priceDown') {
    query += `ORDER BY "Dealer Price" DESC`
  } else if (sort == 'priceUpInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`
  } else if (sort == 'quantityDown') {
    query += `ORDER BY total_quantity DESC`
  } else if (sort == 'priceDownInStock') {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `
  } else if (sort == 'onlyInStock') {
    query += `AND total_quantity > 0 `
  }

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/api/model/:item_no', (req, response) => {
  var item_no = req.params.item_no;
  console.log(item_no);

// Took this away from below query because additional spec call comes later
  // LEFT JOIN davidsons_attributes
  // ON davidsons_attributes.itemno = davidsons_inventory.item_no

  // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {
  pool.query(` SELECT * FROM davidsons_inventory_new
  LEFT JOIN davidsons_quantity_new
  ON davidsons_inventory_new."Item #" = davidsons_quantity_new.item_number
  WHERE davidsons_inventory_new."Item #" = '${item_no}'`, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/api/specs/:item_no', (req, response) => {
  var item_no = req.params.item_no;
  console.log(item_no);

  // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {
  pool.query(` SELECT * FROM davidsons_attributes_new
 WHERE itemno = '${item_no}'`, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})












if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));