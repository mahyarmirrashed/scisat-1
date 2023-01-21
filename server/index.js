const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// basic application configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

const questions = require('./res/questions.json');

let statistics = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.', 'res', 'statistics.json'))
);

const calculateMostIncorrectQuestion = () => {
  const obj = statistics['incorrect'];

  return Object.keys(obj).reduce((x, y) => (obj[x] > obj[y] ? x : y));
};

const determineIncorrectQuestions = (answers) => {
  let result = [];

  Object.keys(answers).forEach((key) => {
    if (questions[key] === undefined) return;
    if (answers[key] !== questions[key].answer) result.push(key);
  });

  return result;
};

const determineScore = (incorrectQuestions, totalQuestions) => {
  if (incorrectQuestions > totalQuestions) return 0;
  if (totalQuestions === 0) return 0;

  return (totalQuestions - incorrectQuestions) / totalQuestions;
};

const logIncorectQuestionStatistics = (incorrectQuestions) => {
  incorrectQuestions.forEach(
    (question) => (statistics['incorrect'][question] += 1)
  );
};

const logScoreStatistics = (score) => {
  statistics['scores'].push(score);
};

app.post('/report', (req, res) => {
  console.log('POST request to /report received.');

  if (req.body.answers === undefined) res.status(400).send({});

  let incorrectQuestions = determineIncorrectQuestions(req.body.answers);
  let score = determineScore(
    incorrectQuestions.length,
    Object.keys(req.body.answers).length
  );

  logIncorectQuestionStatistics(incorrectQuestions);
  logScoreStatistics(score);

  let mostIncorrect = calculateMostIncorrectQuestion();

  console.log(statistics['scores']);

  // write results (to prevent data loss)
  fs.writeFileSync(
    path.join(__dirname, '.', 'res', 'statistics.json'),
    JSON.stringify(statistics)
  );

  res.send({
    mostIncorrectQuestion:
      statistics['incorrect'][mostIncorrect] === 0
        ? undefined
        : questions[mostIncorrect]['question']
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
