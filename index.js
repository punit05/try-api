const express=require("express");
const app = express();
const bodyParser=require("body-parser");

const db =require("./db/db");
// Set up the express app



app.use(bodyParser.json());
// get all spastore
app.get('/api/v1/spastore', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'spastore retrieved successfully',
    todos: db
  })
});

app.post('/api/v1/spastore', (req, res) => {
    if(!req.body.name) {
      return res.status(400).send({
        success: 'false',
        message: 'name is required'
      });
    } else if(!req.body.image) {
      return res.status(400).send({
        success: 'false',
        message: 'image is required'
      });
    }
    else if(!req.body.price) {
        return res.status(400).send({
          success: 'false',
          message: 'price is required'
        });
      }

   const spastore = {
     id: db.length + 1,
     name: req.body.name,
     image: req.body.image,
     price:req.body.price
   }
   db.push(spastore);
   return res.status(201).send({
     success: 'true',
     message: 'spastore added successfully',
     spastore
   })
  });

  app.get('/api/v1/spastore/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((spastore) => {
      if (spastore.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'spastore retrieved successfully',
          spastore,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'spastore does not exist',
    });
  });


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});