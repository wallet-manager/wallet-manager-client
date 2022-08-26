import BigNumber from "bignumber.js";

export enum ChainType{
    BTC = 1,
    ETH = 2,
    TRON = 3
}

export class ChainId{
    static readonly Ethereum = new BigNumber('1');
    static readonly Rinkeby = new BigNumber('4');
    static readonly BSC = new BigNumber('56');
    static readonly Sepolia = new BigNumber('11155111');
}