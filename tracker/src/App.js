import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import FormGroup from '@mui/material/FormGroup';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IOSSwitch from './IOSSwitch';

const Question = () => {
  return (
    <FormGroup>
      <IOSSwitch sx={{ m: 1 }} defaultChecked />
    </FormGroup>
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
        <Question />
      </Container>
    </React.Fragment>
  );
};

export default App;
