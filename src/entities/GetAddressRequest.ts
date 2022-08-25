import BigNumber from "bignumber.js";

export interface GetAddressReqeust {

    merchant_id: BigNumber;
    chain_type: number;
    chain_id: BigNumber;
    client_id: string;
    
}