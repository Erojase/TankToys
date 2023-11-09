import MainCanvas from "../components/MainCanvas";
import { Tank } from "../models/Tank";

export const tank:Tank = new Tank();

export default function Game(){


    return(
        <>
        <MainCanvas/>
        </>
    )
}