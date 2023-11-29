import React from 'react';
import MainCanvas from "../components/MainCanvas";
import { Tank } from "../models/Tank";
import { Button } from "@mui/material";
import { GameMap } from "../models/Map";
import { GameController } from "../controllers/GameController";

export const tank:Tank = new Tank();

export default function Game() {

    React.useEffect(() => {
       GameController.InitialiseUpdate();
      
    
      return () => {
      }
    }, [])
    


    return(
        <>
            <MainCanvas/>
        </>
    )
}