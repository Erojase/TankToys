import { jwtDecode } from "jwt-decode";
import UserController from '../controllers/user/UserController';
import HTTP from './HTTP';

const apiPath = "/";
const multiplayerPath = `${apiPath}Multiplayer`;
const userPath = `${apiPath}User`;
const rankingPath = `${apiPath}Ranking`;
const tankPath = `${apiPath}Tank`;
const mapPath = `${apiPath}Map`;

export enum LoginResponse{
    LOGGED = "LOGGED",
    ERRORED = "ERRORED",
    NEW_USER = "NEW_USER"
}
export enum RegisterResponse{
    CREATED = "CREATED",
    ERRORED = "ERRORED"
}

export class ServerCall {
    private static serverUrl: string = "http://localhost:5090";

    static createRoom = async (playerAddress: string, gamemode: number) => {
        let res = await HTTP.PostRequest(`${this.serverUrl}${multiplayerPath}/createRoom`, JSON.stringify({
            roomId: "string",
            playerId: playerAddress,
            gamemode: gamemode
        }))
        
        if (res.ok) {
            return await res.text();
        }
        return null;
    }

    static joinRoom = async (playerAddress: string, roomId: string) => {
        let res = await HTTP.PostRequest(`${this.serverUrl}${multiplayerPath}/joinRoom`, JSON.stringify({
            roomId: roomId,
            playerId: playerAddress,
            gamemode: 0,
        }))
        return res.ok;
    }

    static leaveRoom = async (playerAddress: string, roomId: string) => {
        let res = await HTTP.PostRequest(`${this.serverUrl}${multiplayerPath}/leaveRoom`, JSON.stringify({
            roomId: roomId,
            playerId: playerAddress
        }))
        return res.ok;
    }

    static login = async (playerAddress: string):Promise<LoginResponse> =>{
        let res = await HTTP.GetRequest(`${this.serverUrl}${userPath}/${playerAddress}`);
        if (res.ok) {
            UserController.jwt = await res.text();
            return LoginResponse.LOGGED;
        } else if (res.status == 404) {
            return LoginResponse.NEW_USER;
        } 
        return LoginResponse.ERRORED;
    }

    static getUser = async (playerAddress: string):Promise<any> => {
        let res = await HTTP.GetRequest(`${this.serverUrl}${userPath}/${playerAddress}`);
        if (res.ok) {
            console.log(await res.json())
        }
        return ;
    }

    static register = async (playerAddress: string, username: string) =>{
        let res = await HTTP.PostRequest(`${this.serverUrl}${userPath}`, JSON.stringify({
            address: {
                address: playerAddress
            },
            user: username,
            level: 0
        }))
        if (res.ok) {
            return RegisterResponse.CREATED
        } 
        return RegisterResponse.ERRORED;
    }
}