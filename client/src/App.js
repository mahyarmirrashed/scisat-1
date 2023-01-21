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
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [matches, setMatches] = useState(0);
  let game = false;
  
  //const [inputGrid, setInputGrid] = useState([[]]);
  const images = [
    {
        "id":1,
        "src": "/res/img/barnacle.jpg",
        "fact": "Barancles eat with their legs.",
        "covered": true,
        "solved": false
    },
    {
        "id":2,
        "src": "/res/img/blue-shark.jpg",
        "fact": "Blue sharks are highly migratory animals.",
        "covered": true,
        "solved": false
    },
    {
        "id":3,
        "src": "/res/img/butchart-gardens.jpg",
        "fact": "Butchart Gardens has 26 green houses.",
        "covered": true,
        "solved": false
    },
    {
        "id":4,
        "src": "/res/img/canada-goose.jpg",
        "fact": "Canadian geese mate for life.",
        "covered": true,
        "solved": false
    },
    {
        "id":5,
        "src": "/res/img/capilano-suspension-bridge.jpg",
        "fact": "The original Capilano Suspension Bridge was built in 1889, with hemp rope and cedar planks.",
        "covered": true,
        "solved": false
    },
    {
        "id":6,
        "src": "/res/img/fishermen.jpg",
        "fact": "The three main groups of species currently cultured in B.C waters include salmon and other finfish, shellfish and marine plants.",
        "covered": true,
        "solved": false
    },
    {
        "id":7,
        "src": "/res/img/giant-octopus.jpg",
        "fact": "Giant Pacific Octopi are known to be intoverted.",
        "covered": true,
        "solved": false
    },
    {
        "id":8,
        "src": "/res/img/gray-whale.jpg",
        "fact": "Gray whales earned the nickname devil fish because of their aggressive reactions when harpooned.",
        "covered": true,
        "solved": false
    },
    {
        "id":9,
        "src": "/res/img/grizzly-bear.jpg",
        "fact": "Grizzly bear front claws can be up to 10cm in length.",
        "covered": true,
        "solved": false
    },
    {
        "id":10,
        "src": "/res/img/grouse-mountain.jpg",
        "fact": "The Grouse Mountain Skyride is an 850M ascent to the peak of Vancouver.",
        "covered": true,
        "solved": false
    },
    {
        "id":11,
        "src": "/res/img/harbor-seal.jpg",
        "fact": "Seals have large eyes to see in dark, deep water.",
        "covered": true,
        "solved": false
    },
    {
        "id":12,
        "src": "/res/img/harbour-air.jpg",
        "fact": "Harbour Air has over 500,000 passengers a year.",
        "covered": true,
        "solved": false
    },
    {
        "id":13,
        "src": "/res/img/heron.jpg",
        "fact": "Great blue herons can fly up to 55 kilometres per hour.",
        "covered": true,
        "solved": false
    },
    {
        "id":14,
        "src": "/res/img/humpback-whale.jpg",
        "fact": "Humpback whales can grow up to 18 meters long.",
        "covered": true,
        "solved": false
    },
    {
        "id":15,
        "src": "/res/img/kitsilano-beach.jpg",
        "fact": "Kitsalano beach used to be known as Greer's beach.",
        "covered": true,
        "solved": false
    },
    {
        "id":16,
        "src": "/res/img/little-brown-bat.jpg",
        "fact": "Little brown bats are nocturnal and hunt most actively for a few hours after dusk.",
        "covered": true,
        "solved": false
    },
    {
        "id":17,
        "src": "/res/img/loon.jpg",
        "fact": "Loons are carnivores.",
        "covered": true,
        "solved": false
    },
    {
        "id":18,
        "src": "/res/img/northern-right-whale-dolphin.jpg",
        "fact": "Northern right whale dolphins can leap more than 6 meters over the surface of the water.",
        "covered": true,
        "solved": false
    },
    {
        "id":19,
        "src": "/res/img/orca.jpg",
        "fact": "Orcas are the largest member of the dolphin family.",
        "covered": true,
        "solved": false
    },
    {
        "id":20,
        "src": "/res/img/rockfish.jpg",
        "fact": "Rockfish can live up to 120 years.",
        "covered": true,
        "solved": false
    },
    {
        "id":21,
        "src": "/res/img/sea-lion.jpg",
        "fact": "Sea lions can walk on land using their four flippers.",
        "covered": true,
        "solved": false
    },
    {
        "id":22,
        "src": "/res/img/seastar.jpg",
        "fact": "Sea Stars (a.k.a Starfish) can regenerate their arms if they are cut off.",
        "covered": true,
        "solved": false
    },
    {
        "id":23,
        "src": "/res/img/stanley-park.jpg",
        "fact": "Stanley park was named after Governor General Lord Frederick Stanley.",
        "covered": true,
        "solved": false
    },
    {
        "id":24,
        "src": "/res/img/trumpeter-swan.jpg",
        "fact": "Trumpeter Swans require a 90 meter takeoff to become airborne.",
        "covered": true,
        "solved": false
    },
    {
        "id":25,
        "src": "/res/img/tufted-puffin.jpg",
        "fact": "The Tufted Puffin is the largest puffin.",
        "covered": true,
        "solved": false
    }
]
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
  
      game = true;
    }, 10000);

    

  }

  // trigger when card is clicked
  function onClick(X, Y) {
    setStatusMessage("You clicked box " + X + " " + Y);
    
    let newBoard = boardGrid.map((rows, indexX) => {
      return rows.map((box, indexY) => {
          if(X === indexX && Y === indexY){
            return {... box, covered:!box.covered}
          }
          else{
            return (box)
          }
        })
      })
      handlePick([X,Y])
      setBoardGrid(newBoard)
  }

  const handlePick = (pick) => {
    pickOne ? setPickTwo(pick) : setPickOne(pick)
  }

  useEffect(() => {
    if(pickOne)
    if(pickOne && pickTwo){
      if(boardGrid[pickOne[0]][pickOne[1]].src === boardGrid[pickTwo[0]][pickTwo[1]].src){
        console.log("same image")
        setStatusMessage("Those two match! " + boardGrid[pickOne[0]][pickOne[1]].fact)
        setMatches(matches+1);
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
            Start game
          </Button>
          <Typography variant="p">Moves Made: {moves}</Typography>
          <Typography variant="p">Matches: {matches}</Typography>
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
                {boardGrid[X][Y].covered?"":<img src={boardGrid[X][Y].src} width='128' height='128'></img>}</Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
