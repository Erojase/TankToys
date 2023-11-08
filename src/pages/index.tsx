import React from 'react'
import { Typography } from '@mui/material'
import Header from '../components/Header';

  

export default function Main() {

  const [variable, setVariable] = React.useState("ejemplo");
  const [pulp, setPulp] = React.useState("Chico");

  const text = React.useRef(null);

  React.useEffect(() => {

    return () => {

    }
  }, []);


  return (
    <>
      <Header usuario='paco' />
      <Typography ref={text}>
        {pulp}
      </Typography>
    </>
  )
}
