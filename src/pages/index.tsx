import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { theme } from '../utils/Theme';
import { dimensions } from '../utils/utils';


export default function Main() {

  const [thisWindow, setThisWindow] = React.useState<dimensions>({
    height: 0,
    width: 0
  });

  React.useEffect(() => {
    setThisWindow({
      height: window.innerHeight,
      width: window.innerWidth
    })
  
    return () => {
      
    }
  }, [])
  

  const toGameClick = () =>{
    window.location.href = "/game";
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} height={thisWindow.height}>
      <Button sx={{ color: theme.palette.primary.contrastText }}
        variant="contained"
        onClick={toGameClick}
      >Un Jugador</Button>
    </Box>
  )
}
