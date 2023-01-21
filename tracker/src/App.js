import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IOSSwitch from './IOSSwitch';

const Question = (props) => {
  return (
    <Grid container data-question-id={props.id}>
      <Grid container item xs={11}>
        <Typography component="h6" variant="h6" align="left" display="inline">
          {props.text}
        </Typography>
      </Grid>
      <Grid container item xs={1} justifyContent="flex-end">
        <IOSSwitch sx={{ mt: 0.5 }} defaultChecked />
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
        <Question id={1} text="Lorem ipsum dolor sit amet." />
      </Container>
    </React.Fragment>
  );
};

export default App;
