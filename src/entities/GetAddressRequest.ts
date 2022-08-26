import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface GetAddressReqeust {

    merchant_id: BigNumber;
    chain_type: ChainType;
    chain_id: BigNumber;
    client_id: string;
    
}