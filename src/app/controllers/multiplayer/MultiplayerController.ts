import { ServerCall } from "../../utils/ServerCall"

export default class MultiplayerController {
    
    static createRoom = async (playerId: string, gamemode: number) : Promise<any> => {
        return await ServerCall.createRoom(playerId, gamemode);
    }

    static joinRoom = async (playerId: string, roomId: string) : Promise<boolean> => {
        return await ServerCall.joinRoom(playerId, roomId);
    }

    static leaveRoom = async (playerId: string, roomId: string) => {
        let res = await ServerCall.leaveRoom(playerId, roomId);
        console.log(res);
    }

    
    
} 