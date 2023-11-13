import React from "react";
import MainCanvas from "../components/MainCanvas";
import { Tank } from "../models/Tank";
import { GameController } from "../controllers/GameController";

export const tank: Tank = new Tank();

export default function Game() {

    let cont = 0;
    const updateCounter = () => {
        setCounter(counter! + 1);
        cont++;
    }
    
    const [counter, setCounter] = React.useState<number>(0);
    
    React.useEffect(() => {
        GameController.addToGameLoop(updateCounter);
        console.log("montado");
        return () => { }
    }, [])

    React.useEffect(() => {
        console.log("jamon");
        
        return () => { }
    }, [counter])


    return (
        <>
            <div>{cont}</div>
            <MainCanvas />
        </>
    )
}