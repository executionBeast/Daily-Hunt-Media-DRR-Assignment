const express = require('express');
const cors = require('cors'); // Import the cors package
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

const app = express();
const port = 8000; // Use the same port as your project

mongoose.connect("mongodb+srv://rishabhrao:test123@cluster0.tjm4fit.mongodb.net/DailyDRRDb");
app.use(bodyParser.urlencoded({
  extended:true
}));
//schema
const DataSchema = new mongoose.Schema({
  id:String,
  startDate: String,
  endDate: String,
  leadCount: String,
  monthYearText: String,
  numberOfDays: Number,
  datePick: String,
  expectedDRR: Number,
  lastUpdate: String,
});

//model

const Data = mongoose.model("Data", DataSchema);
// Use the cors middleware
app.use(cors());
app.use(express.json())
// Your existing middleware and routes (if any) should go here

// Handle the POST request at '/save-data'
app.post('/save-data', async(req, res) => {
  try {
    const id = req.body.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const datePick = req.body.datePick;
    const leadCount = req.body.lead_count;
   
    const newData = new Data({ id,startDate, endDate,datePick, leadCount });
    console.log(newData)
   
    const n= await newData.save(); 
    // Data.insertMany(data)
    //   .then(function () {
    //     console.log("Successfully saved  items to DB");
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   res.redirect("/")
    // });

    // Here you can save the data to a database or perform any necessary actions
    
 

   
    res.send(n)
    
  } catch (error) {
    console.log('error hai bhai')
  }
  // Send a response (if needed)
  // res.json({ message: 'Data saved successfully' });
  
});

// Start the server on the same host and port as your project
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${3000}`);
});
