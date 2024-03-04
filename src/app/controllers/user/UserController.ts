import { JsonRpcSigner } from "ethers";
import { User } from "../../models/User";

export default class UserController {
    
    
    private _user : User;
    public get user() : User {
        return this._user;
    }
    public set user(v : User) {
        this._user = v;
    }
    
    
    private static _Signer : JsonRpcSigner | null = null;
    public static get Signer() : JsonRpcSigner | null {
        return this._Signer;
    }

    static SetSigner(signer: JsonRpcSigner){
        this._Signer = signer;
    }
    

}