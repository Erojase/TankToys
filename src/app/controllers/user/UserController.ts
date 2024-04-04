import { JsonRpcSigner } from "ethers";
import { User } from '../../models/User';
import { jwtDecode } from "jwt-decode";


export default class UserController {



    public static set jwt(v: string) {
        window.localStorage.setItem("auth", v);
    }

    public static get user(): User | undefined {
        try {
            // mock user
            //return {address:"", level:10, user:"mockuser", profileImage:"https://t3.ftcdn.net/jpg/04/51/57/42/360_F_451574291_2fCf9rUfMSnYP7X3ieZJTCq5u2InaKej.jpg"}
            return JSON.parse(jwtDecode<any>(window.localStorage.getItem("auth")!)['user']);
        } catch (error) {
            return undefined;
        }
    }


    private static _Signer: JsonRpcSigner | null = null;
    public static get Signer(): JsonRpcSigner | null {
        return this._Signer;
    }

    static SetSigner(signer: JsonRpcSigner) {
        this._Signer = signer;
    }


}