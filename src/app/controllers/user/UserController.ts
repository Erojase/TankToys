import { JsonRpcSigner } from "ethers";
import { User } from "../../models/User";
import { jwtDecode } from "jwt-decode";


export default class UserController {



    public static set jwt(v: string) {
        window.localStorage.setItem("auth", v);
    }

    public static get user(): User | undefined {
        try {
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