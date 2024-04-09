import { ServerCall } from "../../utils/ServerCall"

export default class MultiplayerController {
    
    static createRoom = async (playerId: string, gamemode: number) => {
        let res = await ServerCall.createRoom(playerId, gamemode);
        console.log(res);
    }

    static joinRoom = async (playerId: string, roomId: string) => {
        let res = await ServerCall.joinRoom(playerId, roomId);
        console.log(res);
    }

    
    
}