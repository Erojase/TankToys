import HTTP from './HTTP';

const apiPath = "/api/v1/";
const multiplayerPath = `${apiPath}multi/`;
const userPath = `${apiPath}/user`;
const rankingPath = `${apiPath}/ranking`;
const tankPath = `${apiPath}/tank`;
const mapPath = `${apiPath}/map`;

export default class ServerCall {
    private static serverUrl: string = "http://localhost:8090";

    static createRoom = async (playerAddress: string, gamemode: number) => {
        let res = await HTTP.PostRequest(`${this.serverUrl}${multiplayerPath}createRoom`, JSON.stringify({
            playerId: playerAddress,
            gamemode: gamemode
        }))
        
        if (res.ok) {
            return await res.text();
        }
        return null;
    }
}