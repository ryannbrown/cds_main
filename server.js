const express = require('express');
const bodyParser = require('body-parser');

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


app.get('/browse/:criteria', (req, response) => {
  var criteria = req.params.criteria;
  console.log(criteria);

  pool.query(`SELECT DISTINCT ${criteria} FROM davidsons_inventory WHERE ${criteria} IS NOT NULL`, (error, results) => {
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
app.get('/manufacturer/:manufacturer', (req, response) => {
  var manufacturer = req.params.manufacturer;
  console.log(manufacturer);

  pool.query(`SELECT *
  FROM davidsons_inventory
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory.item_no
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory.item_no = davidsons_quantity.item_number
  WHERE davidsons_inventory.manufacturer ILIKE '%${manufacturer}%'
  ORDER BY image1 ASC,
  total_quantity ASC`, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/gun_type/:gun_type', (req, response) => {
  var gun_type = req.params.gun_type;
  console.log("these are the params")
  console.log(gun_type);

  pool.query(`SELECT *
  FROM davidsons_inventory
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory.item_no
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory.item_no = davidsons_quantity.item_number
  WHERE davidsons_inventory.gun_type ILIKE '%${gun_type}%'
  ORDER BY image1 ASC,
  total_quantity ASC`, (error, results) => {
    if (error) {
      throw error
    }

    var data = results.rows
    response.send(JSON.stringify({ data }));

  });


})
app.get('/caliber/:caliber', (req, response) => {
  var caliber = req.params.caliber;
  console.log(caliber);

  pool.query(`SELECT *
  FROM davidsons_inventory
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory.item_no
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory.item_no = davidsons_quantity.item_number
  WHERE davidsons_inventory.caliber ILIKE '%${caliber}%'
  ORDER BY image1 ASC,
  total_quantity ASC`, (error, results) => {
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

  // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {
  pool.query(` SELECT * FROM davidsons_inventory
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory.item_no
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory.item_no = davidsons_quantity.item_number
  WHERE davidsons_inventory.item_no = '${item_no}'`, (error, results) => {
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