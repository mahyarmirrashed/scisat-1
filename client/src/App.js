import logo from './logo.svg';
import './App.css';
//import './style.css';
import { useEffect, useState } from 'react';
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
  const BOARD_SIZE = 6;
  const [statusMessage, setStatusMessage] = useState("Click the button above to start!");
  const [moves, setMoves] = useState(0);
  const [pickOne, setPickOne] = useState(null)
  const [pickTwo, setPickTwo] = useState(null)
  
  //const [inputGrid, setInputGrid] = useState([[]]);
  const images = [
    {"src":"/res/img/capilano-suspension-bridge.jpg",
      "fact":""},
    {"src":"/res/img/stanley-park.jpg",
      "fact":""}
  ]
  let board_grid = [[{"image":2, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  ];
  const [boardGrid, setBoardGrid] = useState([board_grid]);

  function startGame() {
    setMoves(0);
    let boardItems = [];
    let candidates = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    let board_grid = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE));
    while (boardItems.length<18) {
      let rand = Math.floor(Math.random()*candidates.length);
      let item = {"id":candidates[rand], "free":2};
      boardItems.push(item);
      candidates.splice(rand,1);
    }
    let idx = 0;
    while (idx<BOARD_SIZE*BOARD_SIZE) {
      let rand = Math.floor(Math.random()*boardItems.length);
      let item = boardItems[rand].id;
      board_grid[Math.floor(idx/BOARD_SIZE)][idx%BOARD_SIZE] = item;
      boardItems[rand].free--;
      if (boardItems[rand].free<=0) {
        boardItems.splice(rand, 1);
      }
      idx++;
    }
    console.log(board_grid);
  }

  function onClick(X, Y) {
    setStatusMessage("You clicked box " + X + " " + Y);
    board_grid[X][Y].covered = !board_grid[X][Y].covered;
    handlePick([X,Y])

  }

  const handlePick = (pick) => {
    pickOne ? setPickTwo(pick) : setPickOne(pick)
  }

  useEffect(() => {
    if(pickOne)
    console.log(pickOne[0])
    if(pickOne && pickTwo){
      if(board_grid[pickOne[0]][pickOne[1]].image === board_grid[pickTwo[0]][pickTwo[1]].image){
        console.log("same image")
      }
      else{console.log("diff image")}
      setPickOne(null)
      setPickTwo(null)
      setMoves(moves+1)
    }

  }, [pickOne, pickTwo])
  
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">SCISAT-1</Typography>
          </Toolbar>
        </AppBar>
        <Paper mt="4" elevation={20}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => startGame()}
            sx={{
              margin: "8px",
            }}
          >
            Start game
          </Button>
          <Typography variant="p">Moves Made: {moves}</Typography>
          <div/>
          <Typography variant="p">{statusMessage}</Typography>
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
