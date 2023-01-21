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
import SelectInput from '@mui/material/Select/SelectInput';
import Fade from '@mui/material/Fade';
import images from "./facts.json";
import { yellow } from '@mui/material/colors';

function App() {
  const BOARD_SIZE = 6;
  const [statusMessage, setStatusMessage] = useState("Click the button above to start!");
  const [moves, setMoves] = useState(0);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [matches, setMatches] = useState(0);
  const [game, setGame] = useState(false);
  const [block, setBlock] = useState(false);
  
  //const [inputGrid, setInputGrid] = useState([[]]);
  
  let board_grid = [[{"image":2, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  [{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true},{"image":1, "covered":true}],
  ];
  const [boardGrid, setBoardGrid] = useState(board_grid);

  function startGame() {
    setMoves(0);
    setMatches(0);
    setStatusMessage("You started the game, memorize the board then match the images once they turn over!");

    let boardItems = [];
    let candidates = Array(images.length).fill(null).map((item, id) => {
      return id;
    });
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
    let newBoard = board_grid.map((rows, indexX) => {
      return rows.map((id, indexY) => {
          return {... images[id], covered:false};
        })
      })
    setBoardGrid(newBoard);

    // show all for 10 seconds

    setTimeout(function () {
      newBoard = board_grid.map((rows, indexX) => {
        return rows.map((id, indexY) => {
            return {... images[id], covered:true};
          })
        })
      setBoardGrid(newBoard);
      setStatusMessage("click on two cards to see if they match!")
  
      setGame(true);
    }, 10000);

    

  }
    
  const toggleSolved = (X1 ,Y1, X2, Y2) => {
    let newBoard = boardGrid.map((rows, indexX) => {
      console.log(...rows)
      return rows.map((box, indexY) => {
          if((X1 === indexX && Y1 === indexY)||
          (X2 === indexX && Y2 === indexY)){
            return {... box, solved:!box.solved}
          }
          else{
            return (box)
          }
        })
      })
      setBoardGrid(newBoard)
  }

  const clear = (X1 ,Y1, X2, Y2) => {
    let newBoard = boardGrid.map((rows, indexX) => {
      return rows.map((box, indexY) => {
          if((pickOne[0] === indexX && pickOne[1] === indexY)||
          (pickTwo[0] === indexX && pickTwo[1] === indexY)){
            return {... box, covered:!box.covered}
          }
          else{
            return (box)
          }
        })
      })
      setBoardGrid(newBoard);
      setPickOne(null);
      setPickTwo(null);
      setBlock(false);
  }

  const flip = (X,Y) => {
    let newBoard = boardGrid.map((rows, indexX) => {
      return rows.map((box, indexY) => {
          if(X === indexX && Y === indexY && !box.solved){
            return {... box, covered:!box.covered}
          }
          else{
            return (box)
          }
        })
      })
      setBoardGrid(newBoard)
    }

  function onClick(X, Y) {
    if(game && !block && !boardGrid[X][Y].solved){
      //setStatusMessage("You clicked box " + X + " " + Y);
      flip(X,Y)
      handlePick([X,Y])
    }
  }

  const handlePick = (pick) => {
    pickOne ? setPickTwo(pick) : setPickOne(pick)
  }

  useEffect(() => {
    if(pickOne && pickTwo){
      if((pickOne[0] == pickTwo[0] && pickOne[1] == pickTwo[1])){
        setStatusMessage("Pick a different card");
        setPickTwo(null);
        return;
      }
      if(boardGrid[pickOne[0]][pickOne[1]].src === boardGrid[pickTwo[0]][pickTwo[1]].src){
        setStatusMessage("Those two match! " + boardGrid[pickOne[0]][pickOne[1]].fact);
        toggleSolved(pickOne[0], pickOne[1], pickTwo[0], pickTwo[1]);
        setMatches(matches+1);
        setPickOne(null);
        setPickTwo(null);
        if (matches === Math.floor((BOARD_SIZE*BOARD_SIZE)/2)) {
          alert("Congrats! you matched all the cards in " + moves + " Moves! Click 'New Game' to play again!");
        }
      }
      else{
        console.log(pickOne[0], pickOne[1], pickTwo[0], pickTwo[1]);
        setBlock(true);
        setTimeout(function(){clear(pickOne[0], pickOne[1], pickTwo[0], pickTwo[1])}, 1000);
        console.log(pickOne);
        console.log(pickTwo);
      }
      setMoves(moves+1)
    }

  }, [pickOne, pickTwo])
  
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">SCISAT-1 Memory Mayhem</Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{
            marginTop: "16px", 
            marginBottom: "16px",
            paddingBottom: "64px"
            }} 
            elevation={20}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => startGame()}
            sx={{
              margin: "8px",
            }}
          >
            New Game
          </Button>
          <Typography variant="p" marginX={2}>Moves Made: {moves}</Typography>
          <Typography variant="p" marginX={2}>Matches: {matches}</Typography>
          <div/>
          <Typography variant="h6" marginY={2}>{statusMessage}</Typography>
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
                    backgroundColor: boardGrid[X][Y].solved?yellow[500]:'primary.main',
                  }}
                  onClick={() => onClick(X, Y)}
                >
                <Fade in={!boardGrid[X][Y].covered}>{<img src={boardGrid[X][Y].src} width='128' height='128'></img>}</Fade></Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
