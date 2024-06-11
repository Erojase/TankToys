import { Position } from "../../models/Tank";
import { ServerCall } from "../../utils/ServerCall"
import UserController from "../user/UserController";

export interface RoomData {
    id: string,
    playerPositions: {
        [x: string]: {
            xCoord: number, yCoord: number
        }
    }
}

export default class MultiplayerController {

    static createRoom = async (playerId: string, gamemode: number): Promise<any> => {
        if (playerId == null || playerId == undefined) {
            return "Address not set";
        }
        let res = await ServerCall.createRoom(playerId, gamemode);
        if (res == null) {
            return "Some problem";
        }
        return res;
    }

    static joinRoom = async (playerId: string, roomId: string): Promise<boolean> => {
        return await ServerCall.joinRoom(playerId, roomId);
    }

    static leaveRoom = async (playerId: string, roomId: string) => {
        let res = await ServerCall.leaveRoom(playerId, roomId);
        if (res) {
            window.localStorage.removeItem("room");
        }
        console.log(res);
    }

    static roomData = async (roomid: string, positions: Position): Promise<any> => {
        let address = UserController.user?.address;
        if (address != undefined) {
            let res = await ServerCall.roomData(roomid, address, positions);
            return res;
        }
        return null;
    }

} 