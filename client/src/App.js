import logo from './logo.svg';
import './App.css';
//import './style.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [statusMessage, setStatusMessage] = useState("Start the Game!");
  //const [inputGrid, setInputGrid] = useState([[]]);
  const images = [
    {"src":"/res/img/capilano-suspension-bridge.jpg",
      "fact":""},
    {"src":"/res/img/stanley-park.jpg",
      "fact":""}
  ]
  let board_grid = [[{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  ];
  const [boardGrid, setBoardGrid] = useState([board_grid]);

  function onClick(X, Y) {
    setStatusMessage("You clicked box " + X + " " + Y);
    board_grid[X][Y].covered = !board_grid[X][Y].covered;

  }
  
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">SCISAT-1</Typography>
          </Toolbar>
        </AppBar>
        <Paper marginTop="4" elevation={20}>
          <Typography variant="h3">{statusMessage}</Typography>
          {board_grid.map((nums, X) => (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {nums.map((nums, Y) => (
                <Box
                  sx={{
                    border: '2px solid white',
                    padding: '5px',
                    height: '128px',
                    width: '128px',
                    backgroundColor: 'primary.main',
                  }}
                  onClick={() => onClick(X, Y)}
                >
                {board_grid[X][Y].covered?"":<img src={images[board_grid[X][Y].image].src} width='128' height='128'></img>}</Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
