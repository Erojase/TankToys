import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { theme } from '../utils/Theme';



export default function Main() {

  const toGameClick = () =>{
    window.location.href = "/game";
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} height={window.innerHeight}>
      <Button sx={{ color: theme.palette.primary.contrastText }}
        variant="contained"
        onClick={toGameClick}
      >Un Jugador</Button>
    </Box>
  )
}
