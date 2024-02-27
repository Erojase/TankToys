import {ethers, formatEther, parseUnits} from 'ethers';

export default class LoginController{

    private static _provider : ethers.AbstractProvider;
    
    private static InitializeProvider(){
        this._provider = ethers.getDefaultProvider();
    }

}