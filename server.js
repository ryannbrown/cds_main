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

app.use(morgan('dev'));

app.use(busboy())
app.use(busboyBodyParser())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var pg = require('pg');

var conString = process.env.CONNSTRING //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }


  // GET CUSTOM INVENTORY
app.get('/api/posts', function (req, response) {
    
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
     const newPost = {
       image: req.body.image,
       product_name: req.body.product_name,
       product_description: req.body.product_description,
       msrp_price: req.body.msrp_price,
       sale_price: req.body.sale_price
     };
   
     posts.push(newPost)
     client.query(
       `INSERT INTO cds_inventory( uuid, image, product_name,Product_description, msrp_price, sale_price)
       VALUES(uuid_generate_v4(),'${newPost.image}', '${newPost.product_name}', '${newPost.product_description}', '${newPost.msrp_price}', '${newPost.sale_price}');`, (error, results) => {
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
});



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
  busboy.on('finish', function() {
    console.log('Upload finished');
    const file = req.files.element1;
    console.log(file);
 
    uploadToS3(file);
  });

  req.pipe(busboy);
});




app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});




if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));