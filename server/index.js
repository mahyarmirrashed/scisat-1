const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
// basic application configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

const questions = require('./res/questions.json');

let statistics = JSON.parse(fs.readFileSync('./res/statistics.json'));

app.post('/report', (req, res) => {
  console.log('POST request to /report received.');

  console.log(req.body);

  // write results (to prevent data loss)
  fs.writeFileSync(JSON.stringify('./res/statistics.json', statistics));

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
