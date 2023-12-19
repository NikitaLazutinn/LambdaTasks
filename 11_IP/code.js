const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const app = express();
const port = 3000;


const ipDatabase = [];
let ip = 0;         

app.get('/', (req, res) => {
 ip = req.ip;
 
 const stream = fs.createReadStream('ip-database.csv')

 .pipe(csv.parse({ headers: true }))

   .on('data', (row) => {
     ipDatabase.push(row);
   })

   .on('end', () => {

    try{
   const selectedObject = ipDatabase.find(obj => parseInt(obj.start) <= ip && parseInt(obj.end) >= ip);
   res.json(`Your IP:${ip}    Your country is: ${selectedObject.Country_full}(range ${selectedObject.start}-${selectedObject.end})`);
   console.log(selectedObject);
   }catch{
    res.json(`Your IP is: ${ip}   Another IP format!`);
   }

   });
 
 stream.on('error', (err) => {
   console.error('Error reading the CSV file:', err);
 }); 
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);

});
