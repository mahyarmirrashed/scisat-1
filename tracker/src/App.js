import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import questions from './res/questions.json';

const NUMBER_OF_QUESTIONS = 10;

const chooseRandomQuestions = (n = NUMBER_OF_QUESTIONS) => {
  return questions.sort(() => Math.random() - Math.random()).slice(0, n);
};

const collectResponses = async (e) => {
  e.preventDefault();

  const res = await axios.post('http://localhost:5000/report', {
    answers: { 1: false }
  });

  alert(`The most incorrect question is: ${res.data.mostIncorrectQuestion}`);
};

const Question = (props) => {
  const [value, setValue] = React.useState('false');

  return (
    <Grid container sx={{ mb: 2 }}>
      <Grid container item xs={3}>
        <RadioGroup
          row
          sx={{ mt: -0.5 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="False"
            labelPlacement="left"
          />
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="True"
            labelPlacement="left"
          />
        </RadioGroup>
      </Grid>
      <Grid container item xs={9}>
        <Typography component="h6" variant="h6" align="left" display="inline">
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <Container disableGutters maxWidth="md" component="header" sx={{ pt: 8 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Nature Quizlet
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Beautiful British Columbia is full of wonderful nature and
          attractions: from the sea to the sky. Throughout the memory card game,
          you were presented some facts about this here province. Time to test
          how much you remember!
        </Typography>
      </Container>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 4, pb: 4 }}
      >
        <FormControl component="form" onSubmit={collectResponses}>
          {chooseRandomQuestions().map((question) => (
            <Question id={question.id} text={question.question} />
          ))}
          <Box textAlign="center">
            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </Box>
        </FormControl>
      </Container>
    </React.Fragment>
  );
};

export default App;
