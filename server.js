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
    sale_price: req.body.sale_price,
    category: req.body.category,
    caliber: req.body.caliber,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    type: req.body.type,
    barrelLength: req.body.barrelLength,
    finish: req.body.finish,
    quantity: req.body.quantity,
    capacity: req.body.capacity,
    sights: req.body.sights,
    upcNumber: req.body.upcNumber
  };

  posts.push(data)

  const query = `INSERT INTO cds_inventory( uuid, image, product_name, Product_description, msrp_price, sale_price, category, caliber, manufacturer, model, type, barrelLength, finish, quantity, capacity, sights, upcNumber )
     VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`
  const values = [data.image, data.product_name, data.product_description, data.msrp_price, data.sale_price, data.category, data.caliber, data.manufacturer, data.model, data.type, data.barrelLength, data.finish, data.quantity, data.capacity, data.sights, data.upcNumber];
  //  FOR DEV
   console.log(query)
  //  console.log(values)
console.log(data)
  client.query(query, values, (error, results) => {
    if (error) {
      throw error
    }
    res.send('POST request to the homepage')
  }
  );
})



// UPDATE cds inventory
// let updateFields = []
app.post('/api/update', function (req, res) {
  // console.log("keys")
  const data = {
    // image: req.body.image,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    msrp_price: req.body.msrp_price,
    sale_price: req.body.sale_price,
    uuid: req.body.id,
    category: req.body.category,
    caliber: req.body.caliber,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    type: req.body.type,
    barrelLength: req.body.barrelLength,
    finish: req.body.finish,
    quantity: req.body.quantity,
    capacity: req.body.capacity,
    sights: req.body.sights,
    upcNumber: req.body.upcNumber
  };

  // TODO: Potential way to cleanup below code 
  // Object.keys(data).forEach(k => (!data[k] && data[k] !== undefined) && delete data[k]);
  // const values = Object.keys(data).forEach(k => console.log(k));
  // console.log("here is pure data", data)


  // hiding wettest code ever below for QUERY LOGIC
  //#region 


  var criteria = ``

  if (data.product_name) {
    criteria += `product_name = '${data.product_name}'`
  }
  if (data.product_description) {
    if (data.product_name) {
      criteria += `, product_description = '${data.product_description}'`
    } else {
      criteria += `product_description = '${data.product_description}'`
    }
  }
  if (data.msrp_price) {
    if (data.product_name || data.product_description) {
      criteria += `, msrp_price = '${data.msrp_price}'`
    } else {
      criteria += `msrp_price = '${data.msrp_price}'`
    }
  }
  if (data.sale_price) {
    if (data.product_name || data.product_description || data.msrp_price) {
      criteria += `, sale_price = '${data.sale_price}'`
    } else {
      criteria += `sale_price = '${data.sale_price}'`
    }
  }
  if (data.category) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price) {
      criteria += `, category = '${data.category}'`
    } else {
      criteria += `category = '${data.category}'`
    }
  }
  if (data.caliber) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category) {
      criteria += `, caliber = '${data.caliber}'`
    } else {
      criteria += `caliber = '${data.caliber}'`
    }
  }
  if (data.manufacturer) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.caliber) {
      criteria += `, manufacturer = '${data.manufacturer}'`
    } else {
      criteria += `manufacturer = '${data.manufacturer}'`
    }
  }
  if (data.model) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber  ) {
      criteria += `, model = '${data.model}'`
    } else {
      criteria += `model = '${data.model}'`
    }
  }
  if (data.type) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model) {
      criteria += `, type = '${data.type}'`
    } else {
      criteria += `type = '${data.type}'`
    }
  }
  if (data.barrelLength) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength) {
      criteria += `, barrelLength = '${data.barrelLength}'`
    } else {
      criteria += `barrelLength = '${data.barrelLength}'`
    }
  }
  if (data.finish) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength || data.finish) {
      criteria += `, finish = '${data.finish}'`
    } else {
      criteria += `finish = '${data.finish}'`
    }
  }
  if (data.quantity) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength || data.finish ) {
      criteria += `, quantity = '${data.quantity}'`
    } else {
      criteria += `quantity = '${data.quantity}'`
    }
  }
  if (data.capacity) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength || data.finish || data.quantity) {
      criteria += `, capacity = '${data.capacity}'`
    } else {
      criteria += `capacity = '${data.capacity}'`
    }
  }
  if (data.sights) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength || data.finish || data.quantity || data.capacity) {
      criteria += `, sights = '${data.sights}'`
    } else {
      criteria += `sights = '${data.sights}'`
    }
  }
  if (data.sale_price) {
    if (data.product_name || data.product_description || data.msrp_price || data.sale_price || data.category || data.manufacturer || data.caliber || data.model || data.barrelLength || data.finish || data.quantity || data.capacity | data.sights) {
      criteria += `, sale_price = '${data.sale_price}'`
    } else {
      criteria += `sale_price = '${data.sale_price}'`
    }
  }
//#endregion


  const query = `UPDATE cds_inventory SET ${criteria}
  WHERE uuid = '${data.uuid}';`
console.log(query)

  client.query(query, (error, results) => {
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


  //#region query logic
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
//#endregion

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