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
  //const [inputGrid, setInputGrid] = useState([[]]);
  const images = [
    {"src":"/res/imgcapilano-suspension-bridge.jpg",
      "fact":""},
    {"src":"stanley-park.jpg",
      "fact":""}
  ]
  let board_grid = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]];

  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">SCISAT-1</Typography>
          </Toolbar>
        </AppBar>
        <Paper elevation={20}>
          {board_grid.map((nums, X) => (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {nums.map((nums, Y) => (
                <Box
                  sx={{
                    width: '25px',
                    height: '25px',
                    border: '2px solid white',
                    padding: '5px',
                    backgroundColor:
                      board_grid[X][Y] === 0 ? 'white' : 'primary.main',
                    '&:hover': {
                      width: board_grid[X][Y] === 0 ? '25px' : '29px',
                      height: board_grid[X][Y] === 0 ? '25px' : '29px',
                      border:
                        board_grid[X][Y] === 0
                          ? '2px solid lightgray'
                          : '0px',
                    },
                  }}
                ></Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
