import React from "react";
import MainCanvas from "../components/MainCanvas";
import { Tank } from "../models/Tank";
import { Button } from "@mui/material";
import { GameMap } from "../models/Map";

export const tank: Tank = new Tank();

export default function Game() {

    const [map, setMap] = React.useState<GameMap>();

    const mapa = () =>{ setMap(new GameMap(5, 5)) }

    React.useEffect(() => {
        if (map) {
            map?.initialiseMap().generateMap();
            console.log(map?.map);
        }
      return () => {}
    }, [map])
    

    return (
        <>
        <Button onClick={mapa}>mapa</Button>
            <MainCanvas />
        </>
    )
}