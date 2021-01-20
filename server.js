// var cluster = require('cluster');

// if (cluster.isMaster) {

//   // Count the machine's CPUs
//   var cpuCount = require('os').cpus().length;

//   // Create a worker for each CPU
//   for (var i = 0; i < cpuCount; i += 1) {
//       cluster.fork();
//   }

//   cluster.on('exit', function (worker) {

//     // Replace the dead worker,
//     // we're not sentimental
//     console.log('Worker %d died :(', worker.id);
//     cluster.fork();

// });

// // Code to run if we're in a worker process
// } else {

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
var Client = require("ftp");
var fs = require("fs");
var bcrypt = require("bcrypt-nodejs");

const app = express();
const port = process.env.PORT || 5000;

const morgan = require("morgan");
const router = require("express").Router();
const path = require("path");

// aws bucket
const AWS = require("aws-sdk");
require("dotenv").config();
const Busboy = require("busboy");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));

app.use(busboy());
app.use(busboyBodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require("pg");

var conString = process.env.CONNSTRING; //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});

//   app.get('/', function(req, res){
//     res.send({answer: "hello world!"});
// })

// GET CUSTOM INVENTORY
app.options("/api/posts", cors());
app.get("/api/posts", cors(), function (req, response) {
  client.query("SELECT * from cds_inventory", (error, results) => {
    if (error) {
      throw error;
    }
    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});
app.get("/api/posts/:selection", cors(), function (req, response) {
  const data = {
    selection: req.params.selection,
  };

//  console.log(data.selection)
  if (data.selection === 'current') {
    // console.log('is current')
    var query = `SELECT * FROM cds_inventory`;
  } else {
    var values = [data.selection];
    var query = `SELECT * FROM cds_inventory WHERE location = $1`;
  }

  // console.log(query);
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});


// app.get("/api/posts/current", cors(), function (req, response) {
//   // const data = {
//   //   selection: req.params.selection,
//   // };

//   // const values = [data.selection];

//   const query = `SELECT * FROM cds_inventory`;
//   console.log(query);
//   client.query(query, values, (error, results) => {
//     if (error) {
//       throw error;
//     }
//     var data = results.rows;
//     response.send(JSON.stringify({ data }));
//   });
// });

app.get("/api/details/:id", cors(), function (req, response) {
  // var gun_id = req.params.id;
  const data = {
    id: req.params.id,
  };

  const query = `SELECT * from cds_inventory WHERE uuid = $1`;
  const values = [data.id];
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
      // results.status(500)
    }
    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

//    POST CUSTOM INVENTORY
let posts = [];
app.post("/api/post", function (req, res) {
  // console.log("keys");
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
    upcNumber: req.body.upcNumber,
    location: req.body.location,
  };

  posts.push(data);

  const query = `INSERT INTO cds_inventory( uuid, image, product_name, Product_description, msrp_price, sale_price, category, caliber, manufacturer, model, type, barrelLength, finish, quantity, capacity, sights, upcNumber, location )
     VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`;
  const values = [
    data.image,
    data.product_name,
    data.product_description,
    data.msrp_price,
    data.sale_price,
    data.category,
    data.caliber,
    data.manufacturer,
    data.model,
    data.type,
    data.barrelLength,
    data.finish,
    data.quantity,
    data.capacity,
    data.sights,
    data.upcNumber,
    data.location,
  ];
  //  FOR DEV
  // console.log(query);
  //  console.log(values)
  // console.log(data);
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    res.send("POST request to the homepage");
  });
});

// UPDATE cds inventory
// let updateFields = []
app.post("/api/update", function (req, res) {
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
    upcNumber: req.body.upcNumber,
    location: req.body.location,
  };

  // TODO: Potential way to cleanup below code
  // Object.keys(data).forEach(k => (!data[k] && data[k] !== undefined) && delete data[k]);
  // const values = Object.keys(data).forEach(k => console.log(k));
  // console.log("here is pure data", data)

  // hiding wettest code ever below for QUERY LOGIC
  //#region

  var criteria = ``;

  if (data.product_name) {
    criteria += `product_name = '${data.product_name}'`;
  }
  if (data.product_description) {
    if (data.product_name) {
      criteria += `, product_description = '${data.product_description}'`;
    } else {
      criteria += `product_description = '${data.product_description}'`;
    }
  }
  if (data.msrp_price) {
    if (data.product_name || data.product_description) {
      criteria += `, msrp_price = '${data.msrp_price}'`;
    } else {
      criteria += `msrp_price = '${data.msrp_price}'`;
    }
  }
  if (data.sale_price) {
    if (data.product_name || data.product_description || data.msrp_price) {
      criteria += `, sale_price = '${data.sale_price}'`;
    } else {
      criteria += `sale_price = '${data.sale_price}'`;
    }
  }
  if (data.category) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price
    ) {
      criteria += `, category = '${data.category}'`;
    } else {
      criteria += `category = '${data.category}'`;
    }
  }
  if (data.caliber) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category
    ) {
      criteria += `, caliber = '${data.caliber}'`;
    } else {
      criteria += `caliber = '${data.caliber}'`;
    }
  }
  if (data.manufacturer) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.caliber
    ) {
      criteria += `, manufacturer = '${data.manufacturer}'`;
    } else {
      criteria += `manufacturer = '${data.manufacturer}'`;
    }
  }
  if (data.model) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber
    ) {
      criteria += `, model = '${data.model}'`;
    } else {
      criteria += `model = '${data.model}'`;
    }
  }
  if (data.type) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model
    ) {
      criteria += `, type = '${data.type}'`;
    } else {
      criteria += `type = '${data.type}'`;
    }
  }
  if (data.barrelLength) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength
    ) {
      criteria += `, barrelLength = '${data.barrelLength}'`;
    } else {
      criteria += `barrelLength = '${data.barrelLength}'`;
    }
  }
  if (data.finish) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish
    ) {
      criteria += `, finish = '${data.finish}'`;
    } else {
      criteria += `finish = '${data.finish}'`;
    }
  }
  if (data.quantity) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish
    ) {
      criteria += `, quantity = '${data.quantity}'`;
    } else {
      criteria += `quantity = '${data.quantity}'`;
    }
  }
  if (data.capacity) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish ||
      data.quantity
    ) {
      criteria += `, capacity = '${data.capacity}'`;
    } else {
      criteria += `capacity = '${data.capacity}'`;
    }
  }
  if (data.sights) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish ||
      data.quantity ||
      data.capacity
    ) {
      criteria += `, sights = '${data.sights}'`;
    } else {
      criteria += `sights = '${data.sights}'`;
    }
  }
  if (data.upcNumber) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish ||
      data.quantity ||
      data.capacity ||
      data.sights
    ) {
      criteria += `, sale_price = '${data.sale_price}'`;
    } else {
      criteria += `sale_price = '${data.sale_price}'`;
    }
  }
  if (data.location) {
    if (
      data.product_name ||
      data.product_description ||
      data.msrp_price ||
      data.sale_price ||
      data.category ||
      data.manufacturer ||
      data.caliber ||
      data.model ||
      data.barrelLength ||
      data.finish ||
      data.quantity ||
      data.capacity ||
      data.sights ||
      data.upcNumber
    ) {
      criteria += `, location = '${data.location}'`;
    } else {
      criteria += `location = '${data.location}'`;
    }
  }
  //#endregion

  const query = `UPDATE cds_inventory SET ${criteria}
  WHERE uuid = $1;`;
  // console.log(query);

  const values = [data.uuid];

  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    res.send("POST request to the homepage");
  });
});

//    DELETE CUSTOM INVENTORY
app.delete("/api/remove_post", function (req, response) {
  let id = req.body.id;
  // console.log(id);
  client.query(
    `DELETE FROM cds_inventory WHERE id = '${id}' `,
    (error, results) => {
      // console.log(error, results);
      if (error) {
        throw error;
      }

      // var data = results.rows
      var data = results.rows;
      response.send(JSON.stringify({ data }));
    }
  );
});

const BUCKET_NAME = process.env.NAME;
const ACCESS = process.env.ACCESS;
const SECRET = process.env.SECRET;

// TODO: be able to remove pictures from S3 programmatically?
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: ACCESS,
    secretAccessKey: SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        // console.log("error in callback");
        // console.log(err);
      }
      // console.log("success");
      // console.log(data);
    });
  });
}

app.post("/api/upload", function (req, res, next) {
  console.log("body", req.body);
  // console.log("req", req)
  const element1 = req.body.element1;
  // console.log(element1);
  var busboy = new Busboy({ headers: req.headers });

  // The file upload has completed
  busboy.on("finish", function () {
    // console.log("Upload finished");
    const file = req.files.element1;
    // console.log(file);

    uploadToS3(file);
  });

  req.pipe(busboy);
});

// INACTIVE DB
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: 'localhost',
//   database: 'postgres',
//   password: process.env.DB_PASS,
//   port: 5432,
// })

app.get("/browse/:criteria", (req, response) => {
  var criteria = req.params.criteria;

  if (criteria == "silencers") {
    var query = `select distinct manufacturer from lipseys_inventory
  WHERE type = 'Accessory-Silencer Accessories'`;
  } else {
    var query = `SELECT DISTINCT "${criteria}" FROM all_dist
  WHERE "${criteria}" IS NOT NULL
  ORDER BY "${criteria}" DESC`;
  }

  // console.log("criteria", criteria);
  // WHERE ${criteria} IS NOT NULL
  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

// TODO: Change inventory to davidsons_inventory_selected
// TO DO : SLIM ALL THIS DOWN
// // MANUFACTURER Only Davidsons
// app.get('/manufacturer/:manufacturer/:sort', (req, response) => {

//   const data = {
//     manufacturer: req.params.manufacturer
//   }
//   var sort = req.params.sort;
//   // var sortString;
//   let query = `SELECT *
//   FROM davidsons_inventory_selected
//   LEFT JOIN davidsons_attributes
//   ON davidsons_attributes.itemno = davidsons_inventory_selected."Item #"
//   LEFT JOIN davidsons_quantity
//   ON davidsons_inventory_selected."Item #" = davidsons_quantity.item_number
//   WHERE davidsons_inventory_selected.manufacturer ILIKE $1`;

//   //#region query logic
//   if (sort == 'priceUp') {
//     query += `ORDER BY "Dealer Price" ASC`
//   } else if (sort == 'priceDown') {
//     query += `ORDER BY "Dealer Price" DESC`
//   } else if (sort == 'priceUpInStock') {
//     query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`
//   } else if (sort == 'quantityDown') {
//     query += `ORDER BY total_quantity DESC`
//   } else if (sort == 'priceDownInStock') {
//     query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `
//   } else if (sort == 'onlyInStock') {
//     query += `AND total_quantity > 0 `
//   }

//   const values = [data.manufacturer];
//   console.log("query", query)
//   // console.log(manufacturer);
//   console.log("sort:", sort)
//   client.query(query,
//     values,
//     (error, results) => {
//       if (error) {
//         throw error
//       }

//       var data = results.rows
//       response.send(JSON.stringify({ data }));

//     });
//   //#endregion

// })
// MANUFACTURER ALL DIST
app.get("/manufacturer/:manufacturer/:sort", (req, response) => {
  const data = {
    manufacturer: req.params.manufacturer,
  };
  var sort = req.params.sort;
  // var sortString;
  let query = `SELECT *
  FROM all_dist
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = all_dist."Item #"
  LEFT JOIN zanders_images_distinct
  ON zanders_images_distinct.itemnumber = all_dist."Item #"
  LEFT JOIN lipseys_images
  on lipseys_images.itemno = all_dist."Item #"
  WHERE all_dist.manufacturer ILIKE $1`;

  //#region query logic
  if (sort == "priceUp") {
    query += `ORDER BY "Dealer Price" ASC`;
  } else if (sort == "priceDown") {
    query += `ORDER BY "Dealer Price" DESC`;
  } else if (sort == "priceUpInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`;
  } else if (sort == "quantityDown") {
    query += `ORDER BY total_quantity DESC`;
  } else if (sort == "priceDownInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `;
  } else if (sort == "onlyInStock") {
    query += `AND total_quantity > 0 `;
  }

  // TODO: Remove this is just for testing
  // query += ` ORDER BY "Item #";`
  const values = [data.manufacturer];
  // console.log("query", query);
  // console.log(manufacturer);
  // console.log("sort:", sort);
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
  //#endregion
});
app.get("/gun_type/:gun_type/:sort", (req, response) => {
  const data = {
    gun_type: req.params.gun_type,
  };
  var sort = req.params.sort;
  console.log("these are the params");

  let query = `SELECT *
  FROM davidsons_inventory_selected
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory_selected."Item #"
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory_selected."Item #" = davidsons_quantity.item_number
  WHERE davidsons_inventory_selected."Gun Type" ILIKE  $1`;

  if (sort == "priceUp") {
    query += `ORDER BY "Dealer Price" ASC`;
  } else if (sort == "priceDown") {
    query += `ORDER BY "Dealer Price" DESC`;
  } else if (sort == "priceUpInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`;
  } else if (sort == "quantityDown") {
    query += `ORDER BY total_quantity DESC`;
  } else if (sort == "priceDownInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `;
  } else if (sort == "onlyInStock") {
    query += `AND total_quantity > 0 `;
  }

  const values = [data.gun_type];

  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});
app.get("/caliber/:caliber/:sort", (req, response) => {
  const data = {
    caliber: req.params.caliber,
  };

  var sort = req.params.sort;
  // console.log(caliber);

  let query = `SELECT *
  FROM davidsons_inventory_selected
  LEFT JOIN davidsons_attributes
  ON davidsons_attributes.itemno = davidsons_inventory_selected."Item #"
  LEFT JOIN davidsons_quantity
  ON davidsons_inventory_selected."Item #" = davidsons_quantity.item_number
  WHERE davidsons_inventory_selected.caliber ILIKE $1 `;

  if (sort == "priceUp") {
    query += `ORDER BY "Dealer Price" ASC`;
  } else if (sort == "priceDown") {
    query += `ORDER BY "Dealer Price" DESC`;
  } else if (sort == "priceUpInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`;
  } else if (sort == "quantityDown") {
    query += `ORDER BY total_quantity DESC`;
  } else if (sort == "priceDownInStock") {
    query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `;
  } else if (sort == "onlyInStock") {
    query += `AND total_quantity > 0 `;
  }

  const values = [data.caliber];

  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.get("/details/:distributor/model/:item_no", (req, response) => {
  const data = {
    item_no: req.params.item_no,
    distributor: req.params.distributor,
  };
  // console.log(req.params.item_no);

  var processed = data.item_no.replace(",", "");
  // console.log(processed);

  // Took this away from below query because additional spec call comes later
  // LEFT JOIN davidsons_attributes
  // ON davidsons_attributes.itemno = davidsons_inventory_selected.item_no

  // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {

  if (data.distributor == "davidsons") {
    // console.log("Pulling Davidsons data for item");
    var query = `
SELECT * FROM davidsons_inventory_selected
    LEFT JOIN davidsons_quantity
    ON davidsons_inventory_selected."Item #" = davidsons_quantity.item_number
    WHERE davidsons_inventory_selected."Item #" = $1`;
  }
  if (data.distributor == "zanders") {
    // console.log("Pulling Zanders data for item");
    var query = ` SELECT * FROM zanders_inventory_selected
  LEFT JOIN zanders_images
  ON zanders_images.itemnumber = zanders_inventory_selected.itemnumber
  WHERE zanders_inventory_selected.itemnumber = $1 `;
  } else if (data.distributor == "lipseys") {
    // console.log("Pulling lipseys data for item");
    var query = ` SELECT * FROM lipseys_inventory_selected
  WHERE lipseys_inventory_selected.itemno = $1 `;
  } else if (data.distributor == "sports south") {
    // console.log("Pulling sports south data for item");
    var query = `SELECT * from sports_inventory_selected 
  WHERE itemno = $1`;
  }

  // console.log(query);

  // LEFT JOIN davidsons_quantity
  // ON davidsons_inventory_selected."Item #" = davidsons_quantity.item_number
  // WHERE davidsons_inventory_selected."Item #" = $1`

  const values = [data.item_no];
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.get("/zanders/category/:category/:sort", (req, response) => {
  const data = {
    category: req.params.category,
    sort: req.params.sort,
  };

  // var sort = req.params.sort;

  // console.log(data.sort);
  // // console.log(caliber);

  const values = [data.category];

  let query = `SELECT DISTINCT ON (zanders_inventory.itemnumber) * from zanders_inventory
 LEFT JOIN zanders_quantity ON zanders_inventory.itemnumber = zanders_quantity.itemnumber
 LEFT JOIN zanders_images ON zanders_inventory.itemnumber = zanders_images.ItemNumber
 WHERE category ILIKE $1 `;

  if (data.sort == "onlyInStock") {
    query += `AND zanders_quantity.available > '0' `;
  }
  // console.log(query);
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.get("/zanders/model/:item_no", (req, response) => {
  const data = {
    item_no: req.params.item_no,
  };

  // console.log("item no", data.item_no);

  // Took this away from below query because additional spec call comes later
  // LEFT JOIN davidsons_attributes
  // ON davidsons_attributes.itemno = davidsons_inventory_selected.item_no

  // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {

  const query = `SELECT * from zanders_inventory 
    LEFT JOIN zanders_quantity ON zanders_inventory.itemnumber = zanders_quantity.itemnumber
    LEFT JOIN zanders_images ON zanders_inventory.itemnumber = zanders_images.ItemNumber
    WHERE zanders_inventory.itemnumber = $1`;

  const values = [data.item_no];
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});
// app.get('/sportssouth/model/:item_no', (req, response) => {

//   const data = {
//     item_no: req.params.item_no
//   }

//   console.log("item no", data.item_no)

//   // Took this away from below query because additional spec call comes later
//   // LEFT JOIN davidsons_attributes
//   // ON davidsons_attributes.itemno = davidsons_inventory_selected.item_no

//   // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {

//   const query = `SELECT * from sports_inventory_selected
//     WHERE itemno = $1`

//   const values = [data.item_no]
//   client.query(query, values, (error, results) => {
//     if (error) {
//       throw error
//     }

//     var data = results.rows
//     response.send(JSON.stringify({ data }));

//   });

// })
// app.get('/lipseys/model/:item_no', (req, response) => {

//   const data = {
//     item_no: req.params.item_no
//   }

//   console.log("item no", data.item_no)
//   console.log("HEELLLOOO?")

//   // Took this away from below query because additional spec call comes later
//   // LEFT JOIN davidsons_attributes
//   // ON davidsons_attributes.itemno = davidsons_inventory_selected.item_no

//   // pool.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {

//   const query = `SELECT * from lipseys_inventory WHERE itemno = $1`

//   const values = [data.item_no]
//   client.query(query, values, (error, results) => {
//     if (error) {
//       throw error
//     }

//     var data = results.rows
//     response.send(JSON.stringify({ data }));

//   });

// })
app.get("/api/:specs/:item_no", (req, response) => {
  const data = {
    item_no: req.params.item_no,
  };

  const query = ` SELECT * FROM davidsons_attributes
  WHERE itemno = $1`;

  const values = [data.item_no];

  // client.query(`SELECT * FROM davidsons_attributes WHERE itemno = '${itemno}'`, (error, results) => {
  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }

    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.post("/api/register", function (req, res) {
  const { first_name, last_name, email, password, isSubscribed } = req.body;
  // console.log(req.body);

  const hash = bcrypt.hashSync(password);

  const loginQuery = `INSERT INTO cds_logins(email, password)
VALUES ($1, $2)`;
  const loginValues = [email, hash];

  client.query(loginQuery, loginValues, (error, results) => {
    if (error) {
      // console.log(error);
      return res.status(400).send({
        message: "This is an error!",
      });
    }
    const query = `INSERT INTO cds_users(first_name, last_name, email, subscribed, joined )
     VALUES($1,$2,$3,$4, $5)`;
    const values = [
      first_name,
      last_name,
      email,
      // hash,
      isSubscribed,
      new Date(),
    ];
    //  FOR DEV
    // console.log(query)
    //  console.log(values)
    // console.log(res);
    // console.log(data)
    // this bit runs after login is created, for profile purposes
    client.query(query, values, (error, results) => {
      if (error) {
        // console.log(error)
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.send("POST request to the homepage");
    });
  });
});
app.post("/api/signin", function (req, res) {
  // console.log("keys");
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const query = `SELECT * from cds_logins WHERE email = $1`;
  const values = [data.email];
  //  FOR DEV
  // console.log(query)
  // //  console.log(values)
  // // console.log(res);
  // console.log(data)

  client.query(query, values, (error, results) => {
    let data = results.rows;
    // console.log("password", data[0].password)

    // console.log(data.length);
    if (data.length == 0) {
      return res.status(400).send({
        message: "This is an error!",
      });
    }
    const isValid = bcrypt.compareSync(req.body.password, data[0].password);
    if (isValid) {

      res.send(200);
    } else {
      return res.status(400).send({
        message: "incorrect password",
      });
    }

    // const createSession =() => {
    //   let email = data[0].email
    //   id = Math.floor(Math.random() * 10000 + 1);
    //   console.log(id);
    //   const query = `CREATE TABLE session_${id} (
    //     email     varchar(250)
    // );`
    //   console.log(data[0].email)
    //   // console.log(name)

    //   client.query(query, (error, results) => {

    //    if (!error) {
    //     // sayHi(email, id)
    //    }

    //     // if (error)  {
    //     //   return res.status(400).send({
    //     //     message: 'This is an error!'
    //     //   });
    //     // }
    //     // res.send(200);
    //   })

    //   const sayHi = (email, id) => {

    //     const query = `INSERT INTO session_${id} VALUES  (
    //       '${email}'
    //   );`
    //     client.query(query, (error, results) => {

    //       if (!error) {
    //       console.log("I think it worked")
    //       }

    //        // if (error)  {
    //        //   return res.status(400).send({
    //        //     message: 'This is an error!'
    //        //   });
    //        // }
    //        // res.send(200);
    //      })

    //   }
    // }
    // createSession();
  });
});

app.get("/api/users", function (req, response) {
  client.query("SELECT * from cds_users", (error, results) => {
    if (error) {
      throw error;
    }
    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.get("/api/:email", function (req, response) {
  const data = {
    email: req.params.email,
  };
  const values = [data.email];

  const query = `SELECT DISTINCT ON (saved) *  from cds_users WHERE email = $1`;

  // console.log(values);

  client.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    var data = results.rows;
    response.send(JSON.stringify({ data }));
  });
});

app.post("/savegun", function (req, res) {
  // console.log("keys");
  const data = {
    // id: req.body.id,
    itemId: req.body.itemId,
    email: req.body.email,
  };

  posts.push(data);

  const query = `UPDATE cds_users SET saved = saved || '{${data.itemId}}' WHERE email = $1`;
  const values = [data.email];
  //  FOR DEV
  // console.log(query);
  // //  console.log(values)
  // // console.log(res);
  // console.log(data);
  client.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: "This is an error!",
      });
    }
    res.send("POST request to the homepage");
  });
});

app.post("/deletesavedgun", function (req, res) {
  console.log("keys");
  const data = {
    // id: req.body.id,
    itemId: req.body.id,
    email: req.body.email,
  };

  posts.push(data);

  const query = `update cds_users set saved = array_remove(saved, '${data.itemId}') WHERE email = $1`;
  const values = [data.email];
  //  FOR DEV
  // console.log(query);
  //  console.log(values)
  // console.log(res);
  // console.log(data);
  client.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: "This is an error!",
      });
    }
    res.send("POST request to the homepage");
  });
});
app.post("/orderitem", function (req, res) {
  const {itemName, price, email, first_name, last_name, shipping, billing, cartItems, grandTotal } = req.body
  // console.log("keys");
  const data = {
    // itemName,
    // price,
    grandTotal: grandTotal,
    itemName: [],
    price: [],
    itemId:[],
    items: cartItems,
    email: email,
    first_name,
    last_name,
    billing,
    shipping
  };

// console.log("items", data.items)
// console.log(data.items.length)

data.items.forEach(function(item) {
  data.price.push(item.sale_price);
  data.itemName.push(item.product_name);
  data.itemId.push(item.uuid);
})

var quantity = data.items.length;
var loop = 'UPDATE cds_inventory SET quantity = quantity - 1 WHERE uuid = $1';
 var valueLoop = [data.itemId[0]]
for (i= 2; i <= quantity; i++ ) {
  loop += ' or uuid = $' + [i]
}
for (i= 1; i < quantity; i++ ) {
 valueLoop.push(data.itemId[i]);
}

 const query = loop;
 const values = valueLoop;

 console.log(query)
 console.log(values)

// console.log(data)

  
let mailTo = `mailto:${data.email}?subject=RE:${data.itemName}`;
let emailContent = `

<style>
p {
  font-family: serif;
  font-size:19px;
}
button {
  font-family:serif;
  display: inline-block;
  font-weight: 400;
  color: #0E3B62;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid #0E3B62;
  padding: .375rem .75rem;
  font-size: 1.5rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

button:hover {
  color: #fff;
  background-color: #6F8EA8;
  border-color: #6F8EA8;
}
</style>
<p><strong>${data.first_name} ${data.last_name}</strong> has ordered the following(${data.itemName.length}) item(s): <strong>${data.itemName}</strong>:<p>
 <p><a href=${mailTo}>Email: ${data.email}<a><p>
 <p>Full Name: ${data.first_name} ${data.last_name}</p>
 <p>Billing Address: ${data.billing}</p>
 <p>Shipping Address: ${data.shipping}</p>
 <p>Item Prices: <strong>${data.price}</strong></p>
 <hr>
 <p>Subtotal: <strong>$${data.grandTotal}</strong></p>
 <a href=${mailTo}><button>Reply</button></a>`

  // async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // service: 'Godaddy',
    service: 'gmail',
    // host: 'smtp.gmail.com',
    
    // host: 'smtpout.secureserver.net'
    // port: 25,
    // port: 465,
    // secureConnection: true, // true for 465, false for other ports
    auth: {
      user: process.env.user, // generated ethereal user
      pass: process.env.pass, // generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `michael.judy@colemandefense.com`, // sender address
    to: "michael.judy@colemandefense.com", // list of receivers
    // to: "rb054549@gmail.com", // list of receivers
    subject: `Order Received(${data.itemName.length}): ${data.itemName}`, // Subject line
    // text: `${data.message}`, // plain text body
    html: emailContent, // html body
  });

  
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
if (info.messageId) {
  res.send('POST request to the homepage')
} else {
  // console.log("ERROR!")
    return res.status(400).send({
      message: 'This is an error!'
    });
}
}
// var itemOrdered = false;
main().catch((error) => {
  if (error) {
    // console.log(error)
    res.status(400).send();
  } else {
    console.log("SUCCESSS")
    itemOrdered = true;
  }
});
  // const query = ``;
  // const values = [data.email];

  
  //  FOR DEV
  // console.log(query);
  //  console.log(values)
  // console.log(res);
  // console.log(data);
  // if (itemOrdered) {
    client.query(query, values, (error, results) => {
      if (error) {
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      // res.send("POST request to the homepage");
    });
  // }
})




app.post("/getquote", function (req, res) {
  console.log("keys");
  const data = {
    // id: req.body.id,
    items: req.body.items,
    // email: req.body.email,
  };

//  console.log("data", data)
//  console.log(data.items.length)
 var quantity = data.items.length;
 var loop = 'select * from cds_inventory where uuid = $1';
  var valueLoop = [data.items[0]]
 for (i= 2; i <= quantity; i++ ) {
   loop += ' or uuid = $' + [i]
 }
 for (i= 1; i < quantity; i++ ) {
  valueLoop.push(data.items[i])
 }

  const query = loop;
  const values = valueLoop;
  // console.log("query", query)
  // console.log("values", values)
  client.query(query, values, (error, results) => {
    var data = results.rows
    console.log(data, "data")
    if (error) {
      return res.status(400).send({
        message: "This is an error!",
      });
    } else {
      res.send(JSON.stringify({ data }));
    }
  });
});
// app.get("/getquote/:item", function (req, res) {
//   console.log("keys");
//   const data = {
//     // id: req.body.id,
//     item: req.params.item,
//     // email: req.body.email,
//   };

//  console.log("data", data)

//   const query = `select * from cds_inventory where uuid = $1`;
//   const values = [data.item];
//   //  FOR DEV
//   console.log(query);
//    console.log(values)
//   // console.log(res);
//   console.log(data);
//   client.query(query, values, (error, results) => {
//     var data = results.rows
//     console.log(data, "data")
//     if (error) {
//       return res.status(400).send({
//         message: "This is an error!",
//       });
//     } else {
//       res.send(JSON.stringify({ data }));
//     }
//   });
// });




// app.get('/silencers/manufacturer/:manufacturer/:sort', (req, response) => {

//   const data = {
//     manufacturer: req.params.manufacturer
//   }
//   var sort = req.params.sort;
//   // var sortString;
//   let query = `SELECT *
//   FROM lipseys_inventory
//   WHERE manufacturer ILIKE $1
//   AND TYPE = 'Silencer' `

// console.log("THE EAGLE")

//   //#region query logic
//   if (sort == 'priceUp') {
//     query += `ORDER BY "Dealer Price" ASC`
//   } else if (sort == 'priceDown') {
//     query += `ORDER BY "Dealer Price" DESC`
//   } else if (sort == 'priceUpInStock') {
//     query += `AND total_quantity > 0 ORDER BY "Dealer Price" ASC`
//   } else if (sort == 'quantityDown') {
//     query += `ORDER BY total_quantity DESC`
//   } else if (sort == 'priceDownInStock') {
//     query += `AND total_quantity > 0 ORDER BY "Dealer Price" DESC `
//   } else if (sort == 'onlyInStock') {
//     query += `AND total_quantity > 0 `
//   }

//   // TODO: Remove this is just for testing
// // query += ` ORDER BY "Item #";`
//   const values = [data.manufacturer];
//   console.log("query", query)
//   // console.log(manufacturer);
//   console.log("sort:", sort)
//   client.query(query,
//     values,
//     (error, results) => {
//       if (error) {
//         throw error
//       }

//       var data = results.rows
//       response.send(JSON.stringify({ data }));

//     });
//   //#endregion

// })

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
// console.log('Application running!' + cluster.worker.id);
// }
