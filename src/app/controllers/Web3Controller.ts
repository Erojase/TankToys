import { BrowserProvider, Contract, ContractTransactionResponse, JsonRpcSigner } from "ethers";
import UserController from "./user/UserController";

export default class Web3Controller{

    static TankToys: Contract;
    static TankCoin: Contract;
    static TankToys_Partidas: Contract;
    static TankToys_Players: Contract;

    static async initContracts(provider: BrowserProvider){
        let signer = await provider.getSigner()
        this.TankToys = new Contract("0x79533a5F299Df7D185294047eE0202eAEE48BcBd", this.TankToysAbi, signer);
        this.TankCoin = new Contract("0xEca54117340b26c274ab13AdFfcb811f705245D5", this.TankCoinAbi, signer);
        this.TankToys_Partidas = new Contract("0x13400cd1786124f57714b02decD965259597eF39", this.PartidasAbi, signer);
        this.TankToys_Players = new Contract("0x0941307FBE47eDA25ab059EDA2B869180030dA97", ["function addPlayer(address)"], signer);
    }

    static async LogPlayer(provider: BrowserProvider){
        if (!this.TankToys) {
            await this.initContracts(provider);
        }

        let addr = (await provider.getSigner()).address
        let transaction:ContractTransactionResponse = await this.TankToys_Players["addPlayer"](addr);
        
        return new Promise<string >((resolve, reject) => {
            transaction.wait().then(completed =>{
                resolve(completed?.blockHash!);
            })
        })
        
    }



    static TankToysAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_partidas",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usuarios",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_tkc",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "nCoins",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "rewardsClaimed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "nCoins",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "direction",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "players",
                    "type": "address[]"
                },
                {
                    "internalType": "address[]",
                    "name": "winners",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "win",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "kills",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deaths",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "assist",
                    "type": "uint256"
                }
            ],
            "name": "afterMatchRewards",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nCoins",
                    "type": "uint256"
                }
            ],
            "name": "contractPaySomething",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nCoins",
                    "type": "uint256"
                }
            ],
            "name": "userPaySomething",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    static PlayersAbi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "friend",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "friendPushed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "newPlayer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "newfriend",
                    "type": "address"
                }
            ],
            "name": "addFriend",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "addPlayer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "getFriends",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "friends",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "getLastMathch",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address[]",
                            "name": "players",
                            "type": "address[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "winners",
                            "type": "address[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "win",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "kills",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deaths",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "assist",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct TankToys_Players.partida",
                    "name": "p",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "players",
                    "type": "address[]"
                },
                {
                    "internalType": "address[]",
                    "name": "winners",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "win",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "kills",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deaths",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "assist",
                    "type": "uint256"
                }
            ],
            "name": "updateLastMatch",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    static PartidasAbi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "components": [
                        {
                            "internalType": "address[]",
                            "name": "players",
                            "type": "address[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "winners",
                            "type": "address[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "win",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "kills",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deaths",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "assist",
                            "type": "uint256"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct TankToys_Partidas.partida",
                    "name": "p",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "partidaPushed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "players",
                    "type": "address[]"
                },
                {
                    "internalType": "address[]",
                    "name": "winners",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "win",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "kills",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deaths",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "assists",
                    "type": "uint256"
                }
            ],
            "name": "addPartida",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "getLast10Matches",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address[]",
                            "name": "players",
                            "type": "address[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "winners",
                            "type": "address[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "win",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "kills",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deaths",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "assist",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct TankToys_Partidas.partida[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "getMatches",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address[]",
                            "name": "players",
                            "type": "address[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "winners",
                            "type": "address[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "win",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "kills",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deaths",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "assist",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct TankToys_Partidas.partida[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    static TankCoinAbi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "allowance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "propietario",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "aprobar",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}